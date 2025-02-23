import { useState, useEffect, useRef } from 'react';
import { MdSportsEsports, MdDelete } from 'react-icons/md';
import { fetchData } from '../../services/api.service.js';
import { useAuthHandler } from '../../hooks/authHandler.js';
import { ImSpinner8 } from 'react-icons/im';
import { fetchGameCatalogue } from '../../services/game.service.js';

const ManageCatalogue = () => {
    const [games, setGames] = useState([]);
    const [newGame, setNewGame] = useState({ title: '', description: '', image: '' });
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [loading, setLoading] = useState(false);
    const [popupMessage, setPopupMessage] = useState(null);
    const [showDeletePopup, setShowDeletePopup] = useState(null);
    const { refreshAndRetry, handleInvalidJWT } = useAuthHandler();
    const isFetched = useRef(false);

    const isValidForm = () => {
        return newGame.title && newGame.description && newGame.thumbnail;
    };

    useEffect(() => {
        const getGames = async () => {
            const games = await fetchGameCatalogue();
            if (!games.success) {
                setPopupMessage({ type: 'error', message: games.message || 'Failed to load game catalog' });
                setTimeout(() => setPopupMessage(null), 2000);
                return;
            }
            setGames(games.data);
            isFetched.current = true;
        };
        
        if (!isFetched.current) {
            getGames();
        }
    }, []);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === "thumbnail" && files.length > 0) {
            const file = files[0];
            setNewGame((prev) => ({ ...prev, [name]: file, image: URL.createObjectURL(file) }));
        } else {
            setNewGame((prev) => ({ ...prev, [name]: value }));
        }
    };
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);
        setLoading(true);

        if (!isValidForm()) {
            setLoading(false);
            setError({ type: 'error', message: "Please fill out all required fields." });
            return;
        }

        const formPayload = new FormData();
        formPayload.append('title', newGame.title);
        formPayload.append('description', newGame.description);
        if (newGame.thumbnail) formPayload.append('thumbnail', newGame.thumbnail);

        const options = {
            method: 'POST',
            data: null,
            file: formPayload,
            isBinary: true
        };

        try {
            const response = await fetchData('admin/add-new-game', options);
            if (!response.success) {
                if (response.message === 'jwt expired') {
                    const retryWithNewToken = await refreshAndRetry('admin/add-new-game', options);
                    if (!retryWithNewToken.success) {
                        setError({ type: 'error', message: retryWithNewToken.message });
                        return;
                    }
                    setSuccess({ type: 'success', message: 'New game added successfully!!' });
                    setNewGame({ title: '', description: '', image: '' });
                    return;
                } else if (response.message === 'jwt malformed' || response.message === 'invalid signature') {
                    await handleInvalidJWT();
                    return;
                }
                setError({ type: 'error', message: response.message });
                return;
            }
            setSuccess({ type: 'success', message: 'New game added successfully!!' });
            setNewGame({ title: '', description: '', image: '' });
        } catch (error) {
            setError({ type: 'error', message: error.message });
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteGame = async(gameId) => {
        const options = {
            method: 'DELETE',
            data: { gameId },
            file: null,
            isBinary: false
        }
        try {
            const response = await fetchData('admin/delete-game', options)
            if (!response.success) {
                if(response.message === 'jwt expired'){
                  const retryWithNewToken = await refreshAndRetry('admin/delete-game', options)
                  if(!retryWithNewToken.success){
                    setError({ type: 'error', message: response.message });
                    return
                  }
                  setSuccess({ type: 'success', message: 'game deleted successfully!!' });
                  sessionStorage.setItem('gameCatalogue', JSON.stringify(retryWithNewToken.data));

                } else if (response.message === 'jwt malformed' || response.message === 'invalid signature' || response.message === 'Unauthorized request'){
                  await handleInvalidJWT()
                  return
                }
                setError({ type: 'error', message: response.message });
                return
              }
              
            setSuccess({ type: 'success', message: 'game deleted successfully!!' });
            sessionStorage.setItem('gameCatalogue', JSON.stringify(response.data));

        } catch (error) {
            setError({ type: 'error', message: response.message });
        } finally {
            setShowDeletePopup(null),
            setTimeout(()=>{
                setError(null),
                setSuccess(null)
            }, 5000)
        }
    }

    return (
        <div className="bg-white p-8 rounded-2xl shadow-2xl">
            <h2 className="text-3xl font-bold text-blue-600 mb-6 flex items-center gap-2">
                <MdSportsEsports className="text-4xl" /> Game Catalog
            </h2>
            {/* Popup Notification */}
            {popupMessage && (
                <div className={`fixed bottom-4 left-1/2 transform -translate-x-1/2 px-6 py-3 rounded-xl text-white shadow-lg
                    ${popupMessage.type === 'error' ? 'bg-red-500' : 'bg-green-500'}`}>
                    {popupMessage.message}
                </div>
            )}

            {/* Error and Success Messages */}
            {error && (
                <div className={`mb-4 p-4 rounded-xl ${error.type === 'error' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                    {error.message}
                </div>
            )}
            {success && (
                <div className={`mb-4 p-4 rounded-xl ${success.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {success.message}
                </div>
            )}

            {/* Delete Confirmation Popup */}
            {showDeletePopup && (
                <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-xl shadow-lg text-center">
                        <p className="text-lg font-semibold mb-4">Are you sure you want to delete this game?</p>
                        <div className="flex justify-center gap-4">
                            <button
                                onClick={() => handleDeleteGame(showDeletePopup)}
                                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                            >
                                Yes, Delete
                            </button>
                            <button
                                onClick={() => setShowDeletePopup(null)}
                                className="bg-gray-300 px-4 py-2 rounded-lg hover:bg-gray-400"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Add Game Form */}
                <div className="bg-blue-50 p-6 rounded-xl shadow-sm">
                    <h3 className="text-xl font-semibold mb-4">Add New Game</h3>
                    <form className="space-y-4" onSubmit={handleSubmit}>
                        <input
                            type="text"
                            placeholder="Game Title"
                            className="w-full border rounded-xl px-4 py-2 focus:ring-2 focus:ring-blue-500"
                            value={newGame.title}
                            name='title'
                            onChange={handleChange}
                        />
                        <textarea
                            placeholder="Description"
                            className="w-full border rounded-xl px-4 py-2 focus:ring-2 focus:ring-blue-500"
                            value={newGame.description}
                            name='description'
                            onChange={handleChange}
                        />
                        <div className="border-dashed border-2 border-blue-200 rounded-xl p-4 text-center relative">
                            <input
                                type="file"
                                className="hidden"
                                name='thumbnail'
                                id="game-upload"
                                accept="image/*"
                                onChange={handleChange}
                            />
                            <label
                                htmlFor="game-upload"
                                className={`cursor-pointer text-blue-500 hover:text-blue-600 ${
                                    newGame.thumbnail ? 'text-green-600 font-semibold' : ''
                                }`}
                            >
                                {newGame.thumbnail ? '✔ File Selected: ' + newGame.thumbnail.name : 'Click to upload game cover image'}
                            </label>
                        </div>
                        <button
                            type="submit"
                            className="bg-green-500 text-white px-4 py-2 rounded-xl hover:bg-green-600 w-full flex items-center justify-center"
                            disabled={loading}
                        >
                            {loading ? <ImSpinner8 className="animate-spin" /> : 'Add to Catalog'}
                        </button>
                    </form>
                </div>
                {/* Game List with Scroll */}
                <div className="bg-blue-50 p-6 rounded-xl shadow-sm max-h-[400px] overflow-y-auto">
                    <h3 className="text-xl font-semibold mb-4">Current Games</h3>
                    <div className="space-y-4">
                            {games.map((game, index) => (
                                <div key={game._id || index} className="bg-white p-4 rounded-lg shadow-sm flex items-center justify-between">
                                    <div className="w-5/6">
                                        <h4 className="font-medium">{game.title}</h4>
                                        <p className="text-sm text-gray-600 line-clamp-2">{game.description}</p>
                                    </div>
                                    <button
                                        onClick={() => setShowDeletePopup(game._id)}
                                        className="text-red-500 hover:text-red-700 p-2 rounded-full hover:bg-red-50"
                                    >
                                        <MdDelete className="text-xl" />
                                    </button>
                                </div>
                            ))}
                    </div>
                </div>  
            </div>
        </div>
    );
};

export { ManageCatalogue };
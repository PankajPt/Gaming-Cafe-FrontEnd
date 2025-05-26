import { useState, useEffect, useRef } from 'react';
import { MdSportsEsports, MdDelete } from 'react-icons/md';
import { fetchData } from '../../services/api.service.js';
import { useAuthHandler } from '../../hooks/authHandler.js';
import { ImSpinner8 } from 'react-icons/im';
import { fetchGameCatalogue } from '../../services/game.service.js';
import './admin.css'
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
                } else if (response?.data?.forcedLogout) {
                    await handleInvalidJWT();
                    return
                } else {
                    setError({ type: 'error', message: response.message });
                    return;
                }
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

                } else if (response?.data?.forcedLogout) {
                    await handleInvalidJWT();
                    return
                } else {
                    setError({ type: 'error', message: response.message });
                    return
                }
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
        <div className="bg-gray-900 p-8 rounded-2xl shadow-2xl border-2 border-gray-700">
            <h2 className="text-3xl font-bold text-blue-400 mb-6 flex items-center gap-2 neon-text">
                <MdSportsEsports className="text-4xl pulse" /> Game Catalog
            </h2>

            {/* Popup Notification */}
            {popupMessage && (
                <div className={`fixed bottom-4 left-1/2 transform -translate-x-1/2 px-6 py-3 rounded-xl text-white shadow-lg
                    ${popupMessage.type === 'error' ? 'bg-red-900/30 border-red-400' : 'bg-green-900/30 border-green-400'} 
                    border backdrop-blur-sm`}>
                    {popupMessage.message}
                </div>
            )}

            {/* Messages */}
            {error && (
                <div className={`mb-4 p-4 rounded-xl border ${error.type === 'error' ? 'bg-red-900/30 border-red-400 text-red-400' : 'bg-green-900/30 border-green-400 text-green-400'}`}>
                    {error.message}
                </div>
            )}
            {success && (
                <div className={`mb-4 p-4 rounded-xl border ${success.type === 'success' ? 'bg-green-900/30 border-green-400 text-green-400' : 'bg-red-900/30 border-red-400 text-red-400'}`}>
                    {success.message}
                </div>
            )}

            {/* Delete Popup */}
            {showDeletePopup && (
                <div className="fixed inset-0 bg-black/70 flex justify-center items-center backdrop-blur-sm">
                    <div className="bg-gray-800 p-6 rounded-xl shadow-lg text-center border-2 border-gray-600">
                        <p className="text-lg font-semibold mb-4 text-white">Delete this game?</p>
                        <div className="flex justify-center gap-4">
                            <button
                                onClick={() => handleDeleteGame(showDeletePopup)}
                                className="bg-gradient-to-r from-red-500 to-purple-600 text-white px-6 py-2 rounded-lg hover:scale-105 transition-transform"
                            >
                                Confirm Delete
                            </button>
                            <button
                                onClick={() => setShowDeletePopup(null)}
                                className="bg-gray-600 px-6 py-2 rounded-lg hover:bg-gray-500 text-white"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Add Game Form */}
                <div className="bg-gray-800 p-6 rounded-xl border-2 border-gray-700">
                    <h3 className="text-xl font-semibold mb-4 text-blue-400">Add New Game</h3>
                    <form className="space-y-4" onSubmit={handleSubmit}>
                        <input
                            type="text"
                            placeholder="Game Title"
                            className="w-full bg-gray-700 border-2 border-gray-600 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                            value={newGame.title}
                            name='title'
                            onChange={handleChange}
                        />
                        <textarea
                            placeholder="Description"
                            className="w-full bg-gray-700 border-2 border-gray-600 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                            value={newGame.description}
                            name='description'
                            onChange={handleChange}
                        />
                        <div className="border-dashed border-2 border-blue-400 rounded-xl p-4 text-center relative hover:border-blue-300 transition-colors">
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
                                className={`cursor-pointer ${newGame.thumbnail ? 'text-green-400' : 'text-blue-400'} hover:text-blue-300`}
                            >
                                {newGame.thumbnail ? '✔ ' + newGame.thumbnail.name : 'UPLOAD COVER ART'}
                            </label>
                        </div>
                        <button
                            type="submit"
                            className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-3 rounded-xl hover:scale-105 transition-transform w-full flex items-center justify-center font-bold"
                            disabled={loading}
                        >
                            {loading ? <ImSpinner8 className="animate-spin" /> : 'ADD TO COLLECTION'}
                        </button>
                    </form>
                </div>

                {/* Game List */}
                <div className="bg-gray-800 p-6 rounded-xl border-2 border-gray-700 max-h-[500px] overflow-y-auto custom-scroll">
                    <h3 className="text-xl font-semibold mb-4 text-blue-400">Game Library</h3>
                    <div className="space-y-4">
                        {games.map((game, index) => (
                            <div key={game._id || index} className="bg-gray-700 p-4 rounded-lg hover:bg-gray-600 group transition-colors flex items-center justify-between">
                                <div className="w-5/6">
                                    <h4 className="font-medium text-white">{game.title}</h4>
                                    <p className="text-sm text-gray-300 line-clamp-2">{game.description}</p>
                                </div>
                                <button
                                    onClick={() => setShowDeletePopup(game._id)}
                                    className="text-red-400 hover:text-red-300 p-2 rounded-full hover:bg-red-900/20 transition-colors"
                                >
                                    <MdDelete className="text-xl transform hover:scale-125 transition-transform" />
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
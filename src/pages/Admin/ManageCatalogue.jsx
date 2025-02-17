import { useState } from 'react';
import { MdSportsEsports, MdDelete } from 'react-icons/md';
import { fetchData } from '../../services/api.js';
import { useAuthHandler } from '../../hooks/authHandler.js';
import { ImSpinner8 } from 'react-icons/im';

const ManageCatalogue = () => {
    const [games, setGames] = useState([
        { id: 1, title: 'Cyberpunk 2077', description: 'Action RPG', image: '' },
        { id: 2, title: 'Valorant', description: 'Tactical Shooter', image: '' }
    ]);

    const [newGame, setNewGame] = useState({ title: '', description: '', image: '' });
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [loading, setLoading] = useState(false);
    const { refreshAndRetry, handleInvalidJWT } = useAuthHandler();

    const isValidForm = () => {
        return newGame.title && newGame.description && newGame.image;
    };

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === "thumbnail") {
            setNewGame((prev) => ({ ...prev, [name]: files[0] }));
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
        if (newGame.thumbnail) formPayload.append('avatar', newGame.thumbnail);

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

    const deleteGame = (gameId) => {
        setGames(games.filter(game => game.id !== gameId));
    };

    return (
        <div className="bg-white p-8 rounded-2xl shadow-2xl">
            <h2 className="text-3xl font-bold text-blue-600 mb-6 flex items-center gap-2">
                <MdSportsEsports className="text-4xl" /> Game Catalog
            </h2>

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
                        <div className="border-dashed border-2 border-blue-200 rounded-xl p-4 text-center">
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
                                className="cursor-pointer text-blue-500 hover:text-blue-600"
                            >
                                Click to upload game cover image
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

                {/* Game List */}
                <div className="bg-blue-50 p-6 rounded-xl shadow-sm">
                    <h3 className="text-xl font-semibold mb-4">Current Games</h3>
                    <div className="space-y-4">
                        {games.map((game) => (
                            <div key={game.id} className="bg-white p-4 rounded-lg shadow-sm flex items-center justify-between">
                                <div>
                                    <h4 className="font-medium">{game.title}</h4>
                                    <p className="text-sm text-gray-600">{game.description}</p>
                                </div>
                                <button
                                    onClick={() => deleteGame(game.id)}
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
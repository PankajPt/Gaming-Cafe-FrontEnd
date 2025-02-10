import { useState } from 'react';
import { MdSportsEsports, MdDelete } from 'react-icons/md';

const ManageCatalogue = () => {
      const [games, setGames] = useState([
        { id: 1, title: 'Cyberpunk 2077', description: 'Action RPG', image: '' },
        { id: 2, title: 'Valorant', description: 'Tactical Shooter', image: '' }
      ]);

      const [newGame, setNewGame] = useState({ title: '', description: '', image: '' });
      
      const handleTitle = (e) => {
        setNewGame({...newGame, title: e.target.value})
      }

      const handleDescription = (e) => {
        setNewGame({...newGame, description: e.target.value})
      }

      const deleteGame = (gameId) => {
        setGames(games.filter(game => game.id !== gameId));
      };
      
    return (
        <div className="bg-white p-8 rounded-2xl shadow-2xl">
            <h2 className="text-3xl font-bold text-blue-600 mb-6 flex items-center gap-2">
                <MdSportsEsports className="text-4xl" /> Game Catalog
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Add Game Form */}
                <div className="bg-blue-50 p-6 rounded-xl shadow-sm">
                    <h3 className="text-xl font-semibold mb-4">Add New Game</h3>
                    <form className="space-y-4">
                        <input
                        type="text"
                        placeholder="Game Title"
                        className="w-full border rounded-xl px-4 py-2 focus:ring-2 focus:ring-blue-500"
                        value={newGame.title}
                        onChange={handleTitle}
                        />
                        <textarea
                        placeholder="Description"
                        className="w-full border rounded-xl px-4 py-2 focus:ring-2 focus:ring-blue-500"
                        value={newGame.description}
                        onChange={handleDescription}
                        />
                        <div className="border-dashed border-2 border-blue-200 rounded-xl p-4 text-center">
                        <input 
                            type="file" 
                            className="hidden" 
                            id="game-upload" 
                            accept="image/*"
                        />
                        <label 
                            htmlFor="game-upload" 
                            className="cursor-pointer text-blue-500 hover:text-blue-600"
                        >
                            Click to upload game cover image
                        </label>
                        </div>
                        <button className="bg-green-500 text-white px-4 py-2 rounded-xl hover:bg-green-600 w-full">
                        Add to Catalog
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
    )
}

export { ManageCatalogue }
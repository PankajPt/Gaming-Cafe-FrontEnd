import { motion } from 'framer-motion';

const GameDescription = ({ game }) => {
    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-gray-900 rounded-3xl shadow-lg p-6 flex flex-col items-center gap-6 hover:shadow-blue-500/50 hover:scale-105 transition-all duration-300 overflow-hidden"
        >
            <div className="relative w-full max-w-md overflow-hidden rounded-2xl">
                <img
                    src={game.thumbnail.url}
                    alt={game.title}
                    className="w-full h-auto object-cover transition-transform duration-500 hover:scale-110"
                />
            </div>
            
            <div className="text-center space-y-4">
                <h2 className="text-4xl font-extrabold text-blue-400 font-orbitron uppercase tracking-wide">
                    {game.title}
                </h2>
                <p className="text-gray-300 text-lg leading-relaxed max-w-lg">
                    {game.description}
                </p>
                <button className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg text-lg font-semibold shadow-lg hover:shadow-purple-500/50 transition-all duration-300">
                    Explore Achievements →
                </button>
            </div>
        </motion.div>
    );
};

export default GameDescription;

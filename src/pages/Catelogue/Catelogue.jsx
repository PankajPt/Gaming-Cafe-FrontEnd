import { motion } from 'framer-motion'

const GameDescription = ({ game, isImageFirst }) => {
    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className={`bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl border-2 border-blue-500/30 shadow-[0_0_30px_-10px_rgba(59,130,246,0.3)] overflow-hidden flex flex-col md:flex-row gap-6 p-6 ${
                isImageFirst ? 'md:flex-row' : 'md:flex-row-reverse'
            }`}
        >
            <div className="flex-1 relative overflow-hidden rounded-xl border-2 border-blue-500/30">
                <img
                    src={game.thumbnail.url}
                    alt={game.title}
                    className="w-full h-64 object-cover hover:scale-105 transition-transform duration-300"
                />
            </div>
            
            <div className="flex-1 space-y-4">
                <h2 className="text-3xl font-bold text-blue-400 font-orbitron">
                    {game.title}
                </h2>
                <p className="text-gray-300 text-lg leading-relaxed">
                    {game.description}
                </p>
                <button className="mt-4 px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:shadow-purple-glow transition-all duration-300">
                    View Achievements →
                </button>
            </div>
        </motion.div>
    )
}

export default GameDescription
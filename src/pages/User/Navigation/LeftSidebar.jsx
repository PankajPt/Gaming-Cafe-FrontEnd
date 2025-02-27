import { MdVerified } from 'react-icons/md';
import { FaUser, FaCalendarAlt, FaGamepad, FaCrown, FaSignOutAlt } from 'react-icons/fa';
import { GiPlasmaBolt } from 'react-icons/gi';

// components
import Avatar from './Avatar';

const LeftSideBar = ({ userDetails, isVerified, selectedSection, setSelectedSection }) => {
    const menuItems = [
        { id: 'profile', icon: <FaUser className="mr-3" />, label: 'Player Profile' },
        { id: 'my-plan', icon: <FaCrown className="mr-3" />, label: 'Premium Plan' },
        { id: 'book-slot', icon: <FaCalendarAlt className="mr-3" />, label: 'Book Arena' },
        { id: 'events', icon: <FaGamepad className="mr-3" />, label: 'Live Events' },
    ];

    return (
        <div className="w-72 bg-gradient-to-b from-gray-900 to-gray-800 p-6 shadow-2xl border-r-2 border-blue-500/30 sticky top-0 h-screen overflow-hidden">
            {/* Glowing effect */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-transparent blur-sm" />
            
            <div className="flex flex-col items-center mb-10 mt-6">
                {/* Avatar with glowing border */}
                <div className={`relative mb-4 ${isVerified ? 'pulse' : ''}`}>
                    <Avatar />
                    {isVerified && (
                        <GiPlasmaBolt className="absolute -bottom-1 -right-2 text-blue-400 text-2xl animate-pulse" />
                    )}
                </div>

                <h2 className="text-2xl font-bold text-blue-400 mb-1 font-orbitron tracking-wide">
                    {userDetails.username}
                </h2>
                <div className="flex items-center">
                    {isVerified ? (
                        <div className="flex items-center bg-blue-900/30 px-3 py-1 rounded-full border border-blue-500/50">
                            <MdVerified className="text-blue-400 mr-2 animate-pulse" />
                            <span className="text-sm text-blue-400 font-semibold">ELITE MEMBER</span>
                        </div>
                    ) : (
                        <span className="text-sm text-yellow-500 bg-yellow-900/20 px-3 py-1 rounded-full">
                            ROOKIE STATUS
                        </span>
                    )}
                </div>
            </div>

            <ul className="space-y-4">
                {menuItems.map((item) => (
                    <li
                        key={item.id}
                        className={`group flex items-center px-4 py-3 rounded-xl cursor-pointer 
                            transition-all duration-300 transform hover:translate-x-2 
                            ${
                                selectedSection === item.id
                                    ? 'bg-gradient-to-r from-blue-600/30 to-transparent border-l-4 border-blue-400 shadow-blue-glow'
                                    : 'hover:bg-gray-800/50'
                            }`}
                        onClick={() => setSelectedSection(item.id)}
                    >
                        <span className={`text-lg ${selectedSection === item.id ? 'text-blue-400' : 'text-gray-300'} 
                            group-hover:text-blue-300 transition-colors flex items-center`}>
                            {item.icon}
                            {item.label}
                        </span>
                    </li>
                ))}
            </ul>

            {/* Animated background elements */}
            <div className="absolute bottom-0 left-0 w-full opacity-10">
                <div className="w-full h-24 bg-gradient-to-t from-blue-500 to-transparent" />
            </div>
        </div>
    )
}

export default LeftSideBar;
import { MdVerified } from 'react-icons/md';
import { FaUser, FaCalendarAlt, FaGamepad, FaCrown, FaSignOutAlt, FaKey } from 'react-icons/fa';
import { GiPlasmaBolt } from 'react-icons/gi';
import { MdPeople, MdSportsEsports, MdEvent, MdAccessTime } from "react-icons/md";

const AdminSidebar = ({ activeSection, handleSection }) => {
    const sections = [
        { id: 'users', icon: <MdPeople className="mr-3" />, label: 'User Management' },
        { id: 'games', icon: <MdSportsEsports className="mr-3" />, label: 'Game Catalog' },
        { id: 'events', icon: <MdEvent className="mr-3" />, label: 'Events' },
        { id: 'slots', icon: <MdAccessTime className="mr-3" />, label: 'Time Slots' },
        { id: 'plans', icon: <FaGamepad className="mr-3" />, label: 'Membership Plans' },
        { id: 'cipher', icon: <FaKey className="mr-3" />, label: 'Change Cipher' }
    ];

    return (
        <div className="w-72 bg-gradient-to-b from-gray-900 to-gray-800 p-6 shadow-2xl border-r-2 border-blue-500/30 fixed top-20 left-0 h-[calc(100vh-5rem)] overflow-y-auto z-50">
            {/* Glowing effect */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-transparent blur-sm" />

            <h2 className="text-2xl font-bold text-blue-400 mb-8 font-orbitron tracking-wide">
                Cafe Admin
            </h2>

            <ul className="space-y-4">
                {sections.map((item) => (
                    <li
                        key={item.id}
                        className={`group flex items-center px-4 py-3 rounded-xl cursor-pointer 
                            transition-all duration-300 transform hover:translate-x-2 
                            ${
                                activeSection === item.id
                                    ? 'bg-gradient-to-r from-blue-600/30 to-transparent border-l-4 border-blue-400 shadow-blue-glow'
                                    : 'hover:bg-gray-800/50'
                            }`}
                        onClick={() => handleSection(item.id)}
                    >
                        <span className={`text-lg ${activeSection === item.id ? 'text-blue-400' : 'text-gray-300'} 
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
    );
};

export { AdminSidebar };
import { MdVerified } from 'react-icons/md';
import { FaUser, FaCalendarAlt, FaGamepad, FaCrown, FaSignOutAlt, FaKey } from 'react-icons/fa';
import { GiPlasmaBolt } from 'react-icons/gi';
import Avatar from './Avatar';
import './user.nav.css';

const LeftSideBar = ({ userDetails, isVerified, selectedSection, setSelectedSection }) => {
    const sections = [
        { id: 'profile', icon: <FaUser className="mr-3" />, label: 'Player Profile' },
        { id: 'my-plan', icon: <FaCrown className="mr-3" />, label: 'Premium Plan' },
        { id: 'book-slot', icon: <FaCalendarAlt className="mr-3" />, label: 'Book Arena' },
        { id: 'events', icon: <FaGamepad className="mr-3" />, label: 'Live Events' },
        { id: 'change-cipher', icon: <FaKey className="mr-3" />, label: 'Change Cipher' },
        { id: 'logout', icon: <FaSignOutAlt className="mr-3" />, label: 'Logout' },
    ];

    return (
        <div className="w-72 h-full bg-gradient-to-b from-gray-900 to-gray-800 p-4 lg:p-6 shadow-2xl border-r-2 border-blue-500/30 overflow-y-auto scrollbar-thin scrollbar-track-gray-900/50 scrollbar-thumb-blue-500 hover:scrollbar-thumb-blue-400 scrollbar-rounded">

            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-transparent blur-sm z-20" />
            <div className="flex flex-col items-center mb-6 lg:mb-10 mt-4 lg:mt-6 relative z-10">
                <div className={`relative mb-4 ${isVerified ? 'pulse' : ''}`}>
                    <Avatar />
                    {isVerified && (
                        <GiPlasmaBolt className="absolute -bottom-1 -right-2 text-blue-400 text-2xl animate-pulse" />
                    )}
                </div>

                <h2 className="text-xl lg:text-2xl font-bold text-blue-400 mb-1 font-orbitron tracking-wide">
                    {userDetails.username}
                </h2>
                <div className="flex items-center">
                    {isVerified ? (
                        <div className="flex items-center bg-blue-900/30 px-2 py-1 lg:px-3 lg:py-1 rounded-full border border-blue-500/50 text-sm">
                            <MdVerified className="text-blue-400 mr-2 animate-pulse" />
                            <span className="text-blue-400 font-semibold">ELITE</span>
                        </div>
                    ) : (
                        <span className="text-xs lg:text-sm text-yellow-500 bg-yellow-900/20 px-2 py-1 rounded-full">
                            ROOKIE
                        </span>
                    )}
                </div>
            </div>

            <ul className="space-y-2 lg:space-y-4 relative z-10">
                {sections.map((item) => (
                    <li
                        key={item.id}
                        className={`group flex items-center px-3 py-2 lg:px-4 lg:py-3 rounded-lg lg:rounded-xl cursor-pointer 
                            transition-all duration-300
                            ${
                                selectedSection === item.id
                                    ? 'bg-gradient-to-r from-blue-600/30 to-transparent border-l-4 border-blue-400 shadow-blue-glow'
                                    : 'hover:bg-gray-800/50'
                            }`}
                        onClick={() => setSelectedSection(item.id)}
                    >
                        <span className={`text-base lg:text-lg ${
                            selectedSection === item.id ? 'text-blue-400' : 'text-gray-300'
                        } group-hover:text-blue-300 transition-colors flex items-center`}>
                            {item.icon}
                            <span className="hidden lg:inline">{item.label}</span>
                            <span className="lg:hidden text-sm">{item.label.split(' ')[0]}</span>
                        </span>
                    </li>
                ))}
            </ul>

            <div className="absolute bottom-0 left-0 w-full opacity-10 z-0">
                <div className="w-full h-24 bg-gradient-to-t from-blue-500 to-transparent" />
            </div>
        </div>
    )
}

export default LeftSideBar;

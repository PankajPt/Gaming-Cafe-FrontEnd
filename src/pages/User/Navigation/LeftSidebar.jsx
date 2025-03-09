import { MdVerified } from 'react-icons/md';
import { FaUser, FaCalendarAlt, FaGamepad, FaCrown, FaKey } from 'react-icons/fa';
import { GiPlasmaBolt } from 'react-icons/gi';
import Avatar from './Avatar';

const LeftSideBar = ({ userDetails, isVerified, selectedSection, setSelectedSection, isMobile }) => {
  const sections = [
    { id: 'profile', icon: <FaUser size={24} />, label: 'Profile' },
    { id: 'my-plan', icon: <FaCrown size={24} />, label: 'Premium' },
    { id: 'book-slot', icon: <FaCalendarAlt size={24} />, label: 'Bookings' },
    { id: 'events', icon: <FaGamepad size={24} />, label: 'Events' },
    { id: 'change-cipher', icon: <FaKey size={24} />, label: 'Security' },
  ];

  return (
    <div className={`h-full bg-gray-900/95 backdrop-blur-lg lg:backdrop-blur-0 p-4 lg:p-6 
      ${isMobile ? 'w-72' : 'w-full'} overflow-y-auto scrollbar-thin scrollbar-track-gray-900 scrollbar-thumb-blue-500`}>

      {/* Profile Section */}
      <div className="flex flex-col items-center mb-8 space-y-4">
        <div className="relative">
          <Avatar />
          {isVerified && (
            <GiPlasmaBolt className="absolute bottom-0 right-0 text-blue-400 text-2xl animate-pulse" />
          )}
        </div>
        <div className="text-center">
          <h2 className="text-xl font-bold text-blue-300 mb-1">{userDetails.fullname}</h2>
          <div className="flex items-center justify-center">
            {isVerified ? (
              <div className="flex items-center bg-blue-900/30 px-3 py-1 rounded-full">
                <MdVerified className="text-blue-400 mr-2" />
                <span className="text-sm text-blue-400">Verified</span>
              </div>
            ) : (
              <span className="text-sm text-yellow-500 bg-yellow-900/20 px-3 py-1 rounded-full">
                Rookie
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav>
        <ul className="space-y-2">
          {sections.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => setSelectedSection(item.id)}
                className={`w-full flex items-center p-4 rounded-xl transition-all
                  ${selectedSection === item.id 
                    ? 'bg-blue-600/30 border-l-4 border-blue-400' 
                    : 'hover:bg-gray-800/50'}
                  ${isMobile ? 'text-xl' : 'text-base'}`}
              >
                <span className="text-blue-400 mr-4">{item.icon}</span>
                <span className="text-gray-100">{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default LeftSideBar;

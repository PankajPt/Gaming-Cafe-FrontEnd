import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiMenu, FiX } from 'react-icons/fi';
import UserProfile from './UserProfile/UserProfile.jsx';
import Membership from './Membership.jsx';
import BookSlot from './BookSlot.jsx';
import Events from './Events.jsx';
import LeftSideBar from './Navigation/LeftSidebar.jsx';
import PasswordUpdate from './PasswordUpdate.jsx';

const UserPage = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedSection, setSelectedSection] = useState('profile');
  const userData = sessionStorage.getItem('userData');
  
  if (!userData) navigate('/login');
  const userDetails = JSON.parse(userData);
  const isVerified = userDetails.isActiveUser === 'active';

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
      {/* Mobile Header */}
      <div className="lg:hidden sticky top-0 z-50 bg-gray-800/95 backdrop-blur-sm border-b border-blue-500/30">
        <div className="flex items-center justify-between p-4">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-blue-400 p-2 rounded-lg hover:bg-gray-700/50"
          >
            {isMenuOpen ? <FiX size={28} /> : <FiMenu size={28} />}
          </button>
          <h2 className="text-xl font-bold text-blue-300 font-orbitron">
            @{userDetails.username}
          </h2>
          <div className="w-8" /> {/* Spacer for balance */}
        </div>
      </div>

      {/* Sidebar Overlay */}
      {isMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 lg:hidden z-40"
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      {/* Left Sidebar - Mobile Version */}
      <div className={`fixed lg:relative inset-y-0 left-0 z-50 w-72 transform ${
        isMenuOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:translate-x-0 transition-transform duration-300 ease-in-out`}>
        <LeftSideBar
          userDetails={userDetails}
          isVerified={isVerified}
          selectedSection={selectedSection}
          setSelectedSection={(section) => {
            setSelectedSection(section);
            setIsMenuOpen(false);
          }}
          isMobile={true}
        />
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4 lg:p-8 w-full">
        {selectedSection === 'profile' && <UserProfile userDetails={userDetails} isVerified={isVerified} />}
        {selectedSection === 'my-plan' && <Membership activePlan="Premium Membership" />}
        {selectedSection === 'book-slot' && <BookSlot />}
        {selectedSection === 'events' && <Events />}
        {selectedSection === 'change-cipher' && <PasswordUpdate />}
      </div>
    </div>
  );
};

export default UserPage;
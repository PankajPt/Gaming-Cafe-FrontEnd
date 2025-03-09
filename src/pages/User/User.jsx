import React, { useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import { useNavigate } from 'react-router-dom';
import { FiMenu, FiX } from 'react-icons/fi';
// components
import UserProfile from './UserProfile/UserProfile.jsx';
import Membership from './Membership.jsx';
import BookSlot from './BookSlot.jsx';
import Events from './Events.jsx';
import LeftSideBar from './Navigation/LeftSidebar.jsx';
import PasswordUpdate from './PasswordUpdate.jsx';
import { useAuth } from '../../context/Auth.Context.jsx';

const UserPage = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedSection, setSelectedSection] = useState('profile');
  const userData = sessionStorage.getItem('userData');
  const { logout } = useAuth();

  if (!userData) {
    navigate('/login');
  }
  
  const userDetails = JSON.parse(userData);
  const [activePlan] = useState('Premium Membership');
  const isVerified = userDetails.isActiveUser === 'active';

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Mobile Navigation Toggle */}
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="lg:hidden fixed top-4 right-4 z-50 p-2 bg-gray-800 rounded-lg text-white shadow-lg"
      >
        {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
      </button>

      {/* Left Sidebar - Mobile Overlay */}
      <div className={`lg:block fixed lg:relative inset-0 z-40 transform ${
        isMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      } transition-transform duration-300 ease-in-out`}>
        <LeftSideBar
          userDetails={userDetails}
          isVerified={isVerified}
          selectedSection={selectedSection}
          setSelectedSection={(section) => {
            if (section === 'logout') {
              logout();
              return;
            }
            setSelectedSection(section);
            setIsMenuOpen(false);
          }}
        />
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4 lg:p-8 w-full">


        {/* Profile Section */}
        {selectedSection === 'profile' && (
          <UserProfile userDetails={userDetails} isVerified={isVerified} />
        )}
        {selectedSection === 'my-plan' && <Membership activePlan={activePlan} />}
        {selectedSection === 'book-slot' && <BookSlot />}
        {selectedSection === 'events' && <Events />}
        {selectedSection === 'change-cipher' && <PasswordUpdate />}
      </div>
    </div>
  );
};

export default UserPage;

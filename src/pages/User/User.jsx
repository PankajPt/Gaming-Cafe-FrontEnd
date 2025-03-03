import React, { useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import { useAuth } from '../../context/Auth.Context.jsx';
import { useNavigate } from 'react-router-dom';
// components
import UserProfile from './UserProfile/UserProfile.jsx'
import Membership from './Membership.jsx'
import BookSlot from './BookSlot.jsx'
import Events from './Events.jsx';
import LeftSideBar from './Navigation/LeftSidebar.jsx';
import PasswordUpdate from './PasswordUpdate.jsx';

const UserPage = () => {
  const navigate = useNavigate();
  const userData = sessionStorage.getItem('userData');
  if (!userData) {
    navigate('/login');
  }
  const userDetails = JSON.parse(userData);
  const [selectedSection, setSelectedSection] = useState('profile');
  const { logout } = useAuth();

  const [activePlan] = useState('Premium Membership');
  let isVerified = false;
  if (userDetails.isActiveUser === 'active') {
    isVerified = true;
  }

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Left Sidebar */}
      <LeftSideBar
      userDetails={userDetails}
      isVerified={isVerified}
      selectedSection={selectedSection}
      setSelectedSection={setSelectedSection}
      />

      {/* Main Content */}
      <div className="flex-1 p-8 max-w-4xl">
        {/* Profile Section */}
        {selectedSection === 'profile' && (
          <UserProfile
          userDetails={userDetails}
          isVerified={isVerified}
          />
        )}

          {/* Membership Sections */}
          {selectedSection === 'my-plan' && (
            <Membership
            activePlan={activePlan}
            />
          )}

        {/* Book Slot Section */}
        {selectedSection === 'book-slot' && (
          <BookSlot />
        )}
        
        {/* Events Section */}
        {selectedSection === 'events' && (
          <Events />
        )}

        {selectedSection === 'cipher' && (
          <PasswordUpdate />
        )}
        {/* Logout Section */}
        {selectedSection === 'logout' && (
          <div className="bg-white p-8 rounded-2xl shadow-2xl text-center">
            <h2 className="text-3xl font-bold text-blue-600 mb-4">Ready to Leave?</h2>
            <p className="text-gray-600 mb-8">We hope to see you back soon!</p>
            <button 
            onClick={logout}
            className="bg-red-500 hover:bg-red-600 text-white px-8 py-3 rounded-xl shadow-lg transition transform hover:scale-105">
              Confirm Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserPage;
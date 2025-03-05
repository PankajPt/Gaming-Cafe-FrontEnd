import React, { useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
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
        {selectedSection === 'my-plan' && (<Membership activePlan={activePlan}/>)}
        {selectedSection === 'book-slot' && (<BookSlot />)}
        {selectedSection === 'events' && (<Events />)}
        {selectedSection === 'change-cipher' && ( <PasswordUpdate />)}

      </div>
    </div>
  );
};

export default UserPage;
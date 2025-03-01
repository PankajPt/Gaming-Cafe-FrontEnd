import React, { useState, useEffect } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import { useAuth } from '../../context/Auth.Context.jsx';
import { useNavigate } from 'react-router-dom';
import { fetchData } from '../../services/api.service.js'
import { useAuthHandler } from '../../hooks/authHandler.js'

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
  const [isVerificationSent, setIsVerificationSent] = useState(false);
  const [verificationError, setVerificationError] = useState(null);
  const { logout } = useAuth();
  const { refreshAndRetry, handleInvalidJWT } = useAuthHandler()

  const sendVerificationMail = async () => {
    try {
      const options = {
        method: 'GET',
        data: null,
        file: null,
        isBinary: false
    }
      const response = await fetchData('users/send-verification-link', options)
      if (!response.success) {
        if(response.message === 'jwt expired'){
          const retryWithNewToken = await refreshAndRetry('users/send-verification-link', options)
          if(!retryWithNewToken.success){
            setVerificationError('An error occurred. Please try again later.');
            return
          }
          setIsVerificationSent(true); // Hide the verification banner
          setVerificationError(null); // Clear any previous errors
          alert('Verification email sent successfully! Please check your inbox.');

        } else if (response.message === 'jwt malformed' || response.message === 'invalid signature' || response.message === 'Unauthorized request'){
          await handleInvalidJWT()
          return
        }
        setVerificationError('Failed to send verification email. Please try again.');
        return
      }
      setIsVerificationSent(true); // Hide the verification banner
      setVerificationError(null); // Clear any previous errors
      alert('Verification email sent successfully! Please check your inbox.');
    } catch (error) {
      setVerificationError('An error occurred. Please try again later.');
    }
  };

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
          isVerificationSent={isVerificationSent}
          verificationError={verificationError}
          sendVerificationMail={sendVerificationMail}
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
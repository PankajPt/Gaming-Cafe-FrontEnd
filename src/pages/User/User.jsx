import React, { useState } from 'react';
import { userLogo } from '../../assets/index.assets.js';
import { FaEdit, FaCalendarAlt, FaRegClock, FaRegHeart, FaCheckCircle } from 'react-icons/fa';
import { MdFitnessCenter, MdEventNote, MdPayment, MdVerified } from 'react-icons/md';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useAuth } from '../../context/Auth.Context.jsx'

const UserPage = () => {
  const userData = localStorage.getItem('userData');
  const userDetails = JSON.parse(userData);
  const [selectedSection, setSelectedSection] = useState('profile');

  const [activePlan] = useState('Premium Membership');
  const [upcomingEvents] = useState([
    { name: 'Yoga Workshop', date: 'March 25, 2024' },
    { name: 'HIIT Challenge', date: 'April 2, 2024' }
  ]);

  let isVerified = false
  if(userDetails.isActiveUser === 'active'){
    isVerified = true
  }

  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    console.log("Uploaded file:", file);
  };

  const sendVerificationMail = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_LOCAL_BACKEND_BASE_URI}/users/verify-email-jwt`, {
        method: 'GET',
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Failed to send verification email');
      }
      alert('Verification email sent successfully! Please check your inbox.');
    } catch (error) {
      alert('Something went wrong while sending the verification email. Please try again.');
    }
  };


  const { logout } = useAuth();

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Left Sidebar */}
      <div className="w-64 bg-gradient-to-b from-blue-800 to-blue-600 text-white p-6 shadow-xl rounded-r-3xl sticky top-0 h-screen">
        <div className="flex flex-col items-center mb-8">
          <div className="relative group">
            <img
              src={userLogo}
              alt="Profile"
              className="rounded-full w-32 h-32 border-4 border-blue-200 shadow-xl mb-4 transform transition duration-300 hover:scale-105"
            />
            <label className="absolute bottom-2 right-2 bg-orange-500 p-2 rounded-full cursor-pointer hover:bg-orange-600 shadow-md transition duration-200">
              <FaEdit className="text-white" />
              <input
                type="file"
                className="hidden"
                onChange={handleFileChange}
              />
            </label>
          </div>
          <h2 className="text-xl font-bold text-blue-100">{userDetails.username}</h2>
          <div className="flex items-center mt-1">
            {isVerified ? (
              <>
                <MdVerified className="text-green-400 mr-1" />
                <span className="text-sm text-green-400">Verified</span>
              </>
            ) : (
              <span className="text-sm text-yellow-400">Not Verified</span>
            )}
          </div>
        </div>

        <ul className="space-y-3">
          {['profile', 'my-plan', 'book-slot', 'events', 'logout'].map((section) => (
            <li
              key={section}
              className={`p-3 rounded-xl cursor-pointer transition duration-200 flex items-center ${
                selectedSection === section 
                ? 'bg-blue-900 shadow-inner border-2 border-blue-300' 
                : 'hover:bg-blue-700/80 hover:shadow-md'
              }`}
              onClick={() => setSelectedSection(section)}
            >
              <span className="capitalize">{section.replace('-', ' ')}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 max-w-4xl">
        {/* Profile Section */}
        {selectedSection === 'profile' && (
          <div className="bg-white p-8 rounded-2xl shadow-2xl space-y-6">
            <h1 className="text-4xl font-bold text-blue-600 mb-6">Profile Settings</h1>
            
            {/* Account Verification Status */}
            {!isVerified && (
              <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200 flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-yellow-800">Account Not Verified</h3>
                  <p className="text-sm text-yellow-700">Verify your account to access all features</p>
                </div>
                <button 
                  onClick={sendVerificationMail}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  Verify Now
                </button>
              </div>
            )}

            {/* User Details Section */}
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <label className="text-sm font-semibold text-blue-500">FULL NAME</label>
                <p className="text-2xl text-gray-800 mt-1">{userDetails.fullname}</p>
              </div>

              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <label className="text-sm font-semibold text-blue-500">Username</label>
                <p className="text-gray-700 mt-2 leading-relaxed">
                  {userDetails.username}
                </p>
              </div>

              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <label className="text-sm font-semibold text-blue-500">EMAIL ADDRESS</label>
                <p className="text-xl text-gray-800 mt-1 flex items-center">
                  <MdFitnessCenter className="mr-2 text-blue-500" />
                  {userDetails.email}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Other Sections */}
        {/* Add other sections here as per your current logic */}

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

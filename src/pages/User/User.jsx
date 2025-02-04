import React, { useState, useEffect } from 'react';
import { userLogo } from '../../assets/index.assets.js';
import { FaEdit, FaCalendarAlt, FaRegClock, FaRegHeart, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import { MdFitnessCenter, MdEventNote, MdPayment, MdVerified } from 'react-icons/md';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useAuth } from '../../context/Auth.Context.jsx';
import { useNavigate } from 'react-router-dom';
import { fetchData } from '../../services/api.js'

const UserPage = () => {
  const navigate = useNavigate();
  const userData = localStorage.getItem('userData');
  if (!userData) {
    navigate('/login');
  }
  const userDetails = JSON.parse(userData);
  const [selectedSection, setSelectedSection] = useState('profile');
  const [isVerificationSent, setIsVerificationSent] = useState(false);
  const [verificationError, setVerificationError] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showPasswordUpdate, setShowPasswordUpdate] = useState(false);
  const [passwords, setPasswords] = useState({
    current: '',
    newPassword: '',
    confirm: '',
  });
  const [passwordsMatch, setPasswordsMatch] = useState(false);
  const [updateStatus, setUpdateStatus] = useState(null);

  const { logout } = useAuth();

  useEffect(() => {
    setPasswordsMatch(passwords.newPassword === passwords.confirm);
  }, [passwords.newPassword, passwords.confirm]);

  const handlePasswordChange = (e) => {
    setPasswords({
      ...passwords,
      [e.target.name]: e.target.value,
    });
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    try {
      // Simulate API call for password update
      // const response = await fetch(`${import.meta.env.VITE_BACKEND_BASE_URI}/users/update-password`, {
      //   method: 'POST',
      //   credentials: 'include',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({
      //     current: passwords.current,
      //     newPassword: passwords.newPassword,
      //     confirm: passwords.confirm
      //   }),
      // });

      const response = await fetchData('users/reset-passwd-jwt', 'POST', passwords)
      if (!response.success) {
        setUpdateStatus({ type: 'error', message: response.error });
        return
      }
      setUpdateStatus({ type: 'success', message: 'Password updated successfully!' });
      setPasswords({ current: '', newPassword: '', confirm: '' });
      setTimeout(() => setShowPasswordUpdate(false), 2000);
    } catch (error) {
      setUpdateStatus({ type: 'error', message: 'Failed to update password. Please try again.' });
      console.error('Error updating password:', error);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    console.log('Uploaded file:', file);
  };

  const sendVerificationMail = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_BASE_URI}/users/verify-email-jwt`, {
        method: 'GET',
        credentials: 'include',
      });

      if (!response.ok) {
        setVerificationError('Failed to send verification email. Please try again.');
      }
      setIsVerificationSent(true); // Hide the verification banner
      setVerificationError(null); // Clear any previous errors
      alert('Verification email sent successfully! Please check your inbox.');
    } catch (error) {
      setVerificationError('An error occurred. Please try again later.');
      console.error('Error sending verification email:', error);
    }
  };

  const [activePlan] = useState('Premium Membership');
  const [upcomingEvents] = useState([
    { name: 'Yoga Workshop', date: 'March 25, 2024' },
    { name: 'HIIT Challenge', date: 'April 2, 2024' },
  ]);

  let isVerified = false;
  if (userDetails.isActiveUser === 'active') {
    isVerified = true;
  }

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
              <input type="file" className="hidden" onChange={handleFileChange} />
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

            {/* Success Message */}
            {isVerificationSent && (
              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <h3 className="font-semibold text-green-800">Verification Email Sent</h3>
                <p className="text-sm text-green-700">
                  A verification link has been sent to your registered email address. Please check your inbox.
                </p>
              </div>
            )}

            {/* Error Message */}
            {verificationError && (
              <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                <h3 className="font-semibold text-red-800">Error</h3>
                <p className="text-sm text-red-700">{verificationError}</p>
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
                <p className="text-2xl text-gray-800 mt-1">{userDetails.username}</p>
              </div>

              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <label className="text-sm font-semibold text-blue-500">EMAIL ADDRESS</label>
                <p className="text-2xl text-gray-800 mt-1 flex items-center">
                  <MdFitnessCenter className="mr-2 text-blue-500" />
                  {userDetails.email}
                </p>
              </div>

              {/* Password Update Section */}
              <div className="mt-8">
                <button
                  onClick={() => setShowPasswordUpdate(!showPasswordUpdate)}
                  className="text-blue-600 hover:text-blue-800 font-semibold flex items-center"
                >
                  {showPasswordUpdate ? '▲ Hide' : '▼ Change Password'}
                </button>

                {showPasswordUpdate && (
                  <form onSubmit={handlePasswordSubmit} className="mt-4 space-y-6 max-w-md">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
                      <input
                        type="password"
                        name="current"
                        value={passwords.current}
                        onChange={handlePasswordChange}
                        className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                      <input
                        type="password"
                        name="newPassword"
                        value={passwords.newPassword}
                        onChange={handlePasswordChange}
                        className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>

                    <div className="relative">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
                      <input
                        type="password"
                        name="confirm"
                        value={passwords.confirm}
                        onChange={handlePasswordChange}
                        className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                        required
                      />
                      {passwords.confirm.length > 0 && (
                        <span className="absolute right-3 top-9">
                          {passwordsMatch ? (
                            <FaCheckCircle className="text-green-500" />
                          ) : (
                            <FaTimesCircle className="text-red-500" />
                          )}
                        </span>
                      )}
                    </div>

                    <button
                      type="submit"
                      disabled={!passwordsMatch || !passwords.current}
                      className={`w-full py-2 px-4 rounded-md text-white font-semibold ${
                        passwordsMatch && passwords.current
                          ? 'bg-blue-600 hover:bg-blue-700'
                          : 'bg-gray-400 cursor-not-allowed'
                      }`}
                    >
                      Update Password
                    </button>
                  </form>
                )}

                {/* Password Update Status */}
                {updateStatus && (
                  <div
                    className={`mt-4 p-4 rounded-lg ${
                      updateStatus.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {updateStatus.message}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

                {/* Membership Sections */}
                {selectedSection === 'my-plan' && (
          <div className="bg-white p-8 rounded-2xl shadow-2xl">
            <h2 className="text-3xl font-bold text-blue-600 mb-6">My Membership</h2>
            
            {/* Membership Details */}
            <div className="bg-gradient-to-r from-green-500 to-blue-600 text-white p-6 rounded-xl shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-bold">{activePlan}</h3>
                  <p className="mt-2 opacity-90">Valid until: December 31, 2024</p>
                </div>
                <MdPayment className="text-4xl opacity-90" />
              </div>
              <div className="mt-6 grid grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold">12</div>
                  <div className="text-sm opacity-90">Sessions Left</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">5</div>
                  <div className="text-sm opacity-90">Active Challenges</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">Gold</div>
                  <div className="text-sm opacity-90">Member Tier</div>
                </div>
              </div>
            </div>

            {/* Previous Plan Details */}
            <div className="mt-8">
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">Previous Plans</h3>
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
                  <h4 className="font-semibold text-gray-700">Basic Membership</h4>
                  <p className="text-sm text-gray-600">Valid until: June 30, 2023</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
                  <h4 className="font-semibold text-gray-700">Trial Membership</h4>
                  <p className="text-sm text-gray-600">Valid until: March 31, 2023</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Book Slot Section */}
        {selectedSection === 'book-slot' && (
          <div className="bg-white p-8 rounded-2xl shadow-2xl">
            <h2 className="text-3xl font-bold text-blue-600 mb-6">Book a Session</h2>
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-blue-50 p-6 rounded-xl">
                <FaCalendarAlt className="text-4xl text-blue-600 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Available Slots</h3>
                <div className="space-y-3">
                  {['Mon 9:00 AM', 'Wed 2:00 PM', 'Fri 7:00 AM'].map((slot) => (
                    <div key={slot} className="bg-white p-3 rounded-lg shadow-sm hover:shadow-md transition cursor-pointer">
                      <FaRegClock className="inline mr-2 text-blue-500" />
                      {slot}
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-green-50 p-6 rounded-xl">
                <FaRegHeart className="text-4xl text-green-600 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Your Bookings</h3>
                <div className="space-y-3">
                  {['March 25 - Yoga Session', 'April 1 - PT Session'].map((booking) => (
                    <div key={booking} className="bg-white p-3 rounded-lg shadow-sm">
                      {booking}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Events Section */}
        {selectedSection === 'events' && (
          <div className="bg-white p-8 rounded-2xl shadow-2xl">
            <h2 className="text-3xl font-bold text-blue-600 mb-6">Upcoming Events</h2>
            <div className="grid gap-6 md:grid-cols-2">
              {upcomingEvents.map((event, index) => (
                <div key={index} className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-xl shadow-sm hover:shadow-md transition">
                  <MdEventNote className="text-3xl text-purple-600 mb-3" />
                  <h3 className="text-xl font-semibold mb-2">{event.name}</h3>
                  <p className="text-gray-600">{event.date}</p>
                  <button className="mt-4 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition">
                    Register Now
                  </button>
                </div>
              ))}
            </div>
          </div>
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
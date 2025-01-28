import React, { useState } from 'react';
import { userLogo } from '../../assets/index.assets.js';
import { FaEdit, FaCalendarAlt, FaRegClock, FaRegHeart, FaCheckCircle } from 'react-icons/fa';
import { MdFitnessCenter, MdEventNote, MdPayment, MdVerified } from 'react-icons/md';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const UserPage = () => {
  const [selectedSection, setSelectedSection] = useState('profile');
  const [activePlan] = useState('Premium Membership');
  const [upcomingEvents] = useState([
    { name: 'Yoga Workshop', date: 'March 25, 2024' },
    { name: 'HIIT Challenge', date: 'April 2, 2024' }
  ]);
  const [isVerified, setIsVerified] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    console.log("Uploaded file:", file);
  };

  const userDetails = {
    fullname: 'Johny Johny Yes Papa',
    username: 'John Doe',
    email: 'john.doe@example.com',
    bio: 'Fitness enthusiast passionate about strength training and holistic wellness. Always looking for new challenges!',
  };

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
                  onClick={() => setIsVerified(true)}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  Verify Now
                </button>
              </div>
            )}

            <div className="space-y-6">
              {/* ... (existing profile fields remain same) ... */}
            </div>
          </div>
        )}

        {/* Book Slot Section */}
        {selectedSection === 'book-slot' && (
          <div className="bg-white p-8 rounded-2xl shadow-2xl">
            <h2 className="text-3xl font-bold text-blue-600 mb-6">Book a Session</h2>
            
            {/* Date Picker */}
            <div className="mb-8">
              <label className="block text-lg font-medium text-gray-700 mb-2">Select Date</label>
              <DatePicker
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                minDate={new Date()}
                className="border-2 border-blue-200 rounded-lg p-2 w-full max-w-xs focus:ring-2 focus:ring-blue-500"
                dateFormat="MMMM d, yyyy"
              />
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="bg-blue-50 p-6 rounded-xl">
                <FaCalendarAlt className="text-4xl text-blue-600 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Available Slots</h3>
                <div className="space-y-3">
                  {['9:00 AM', '10:30 AM', '2:00 PM', '4:30 PM'].map((slot) => (
                    <div key={slot} className="bg-white p-3 rounded-lg shadow-sm hover:shadow-md transition cursor-pointer flex items-center justify-between">
                      <div>
                        <FaRegClock className="inline mr-2 text-blue-500" />
                        {slot}
                      </div>
                      <button className="bg-blue-500 text-white px-3 py-1 rounded-md text-sm hover:bg-blue-600">
                        Book
                      </button>
                    </div>
                  ))}
                </div>
              </div>
              {/* ... (rest of book slot section remains same) ... */}
            </div>
          </div>
        )}

        {/* ... (other sections remain similar with verified status indicators where appropriate) ... */}
      </div>
    </div>
  );
};

export default UserPage;
import React, { useState } from 'react';
import { userLogo } from '../../assets/index.assets.js';
import { FaEdit } from 'react-icons/fa';

const UserPage = () => {
  const [selectedSection, setSelectedSection] = useState(null);

  const handleSectionClick = (section) => {
    setSelectedSection(section); // Set the selected section on click
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    console.log("Uploaded file:", file);
  };

  // User details (example data)
  const userDetails = {
    fullname: 'Johny Johny Yes Papa',
    username: 'John Doe',
    email: 'john.doe@example.com',
    profile: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero.',
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Left Sidebar */}
      <div className="w-64 bg-gradient-to-b from-blue-600 to-blue-500 text-white p-6 shadow-lg rounded-r-3xl">
        <div className="flex flex-col items-center mb-8">
          {/* Profile Picture */}
          <img
            src={userLogo}
            alt="Profile"
            className="rounded-full w-32 h-32 border-4 border-white shadow-md mb-4"
          />
          <h2 className="text-xl font-semibold">John Doe</h2>
        </div>

        {/* Navigation Links */}
        <ul className="space-y-6">
          <li
            className="hover:bg-blue-700 p-3 rounded-xl cursor-pointer transition duration-300 ease-in-out transform hover:scale-105"
            onClick={() => handleSectionClick('profile')}
          >
            Profile
          </li>
          <li
            className="hover:bg-blue-700 p-3 rounded-xl cursor-pointer transition duration-300 ease-in-out transform hover:scale-105"
            onClick={() => handleSectionClick('my-plan')}
          >
            My Plan
          </li>
          <li
            className="hover:bg-blue-700 p-3 rounded-xl cursor-pointer transition duration-300 ease-in-out transform hover:scale-105"
            onClick={() => handleSectionClick('book-slot')}
          >
            Book Slot
          </li>
          <li
            className="hover:bg-blue-700 p-3 rounded-xl cursor-pointer transition duration-300 ease-in-out transform hover:scale-105"
            onClick={() => handleSectionClick('events')}
          >
            Events
          </li>
          <li
            className="hover:bg-blue-700 p-3 rounded-xl cursor-pointer transition duration-300 ease-in-out transform hover:scale-105"
            onClick={() => handleSectionClick('logout')}
          >
            Log Out
          </li>
        </ul>
      </div>

      {/* Right Content (Main Area) */}
      <div className="flex-1 p-8">
      {selectedSection === 'profile' && (
        <div className="bg-white p-6 border-2 border-gray-300 shadow-lg space-y-6 rounded-lg">
            <h2 className="text-3xl font-semibold text-gray-800 mb-4">Profile Details</h2>
            <div className="flex justify-center relative">
                <div className="w-32 h-32 rounded-full bg-gray-300 flex items-center justify-center text-white text-3xl">
                {/* Placeholder for profile picture */}
                <img src={userLogo} />
                </div>
                {/* Edit Icon */}
                <label htmlFor="file-upload" className="absolute bottom-0 right-0 bg-gray-700 text-white p-2 rounded-full cursor-pointer">
                <FaEdit />
                </label>
                {/* File Input */}
                <input
                type="file"
                id="file-upload"
                className="hidden"
                onChange={handleFileChange}
                />
            </div>
            <div className="space-y-6">
            {/* Username Section */}
                <div className="bg-gray-50 p-6 border-2 border-gray-300 rounded-lg hover:shadow-lg transition-transform duration-300 ease-in-out transform hover:scale-105">
                    <div className="flex space-x-4 text-gray-700 text-xl">
                        <strong className="font-semibold">Username:</strong>
                        <span>{userDetails.username}</span>
                    </div>
                </div>

            {/* Email Section */}
                <div className="bg-gray-50 p-6 border-2 border-gray-300 rounded-lg hover:shadow-lg transition-transform duration-300 ease-in-out transform hover:scale-105">
                    <div className="flex space-x-4 text-gray-700 text-xl">
                        <strong className="font-semibold">Email-id:</strong>
                        <span>{userDetails.email}</span>
                    </div>
                </div>

            {/* Profile Section */}
                <div className="bg-gray-50 p-6 border-2 border-gray-300 rounded-lg hover:shadow-lg transition-transform duration-300 ease-in-out transform hover:scale-105">
                    <div className="flex space-x-4 text-gray-700 text-xl">
                        <strong className="font-semibold">Full Name:</strong>
                        <span>{userDetails.fullname}</span>
                    </div>
                </div>
            </div>
        </div>
)}



        {selectedSection === 'my-plan' && (
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-gray-700">My Plan</h2>
            {/* Add content related to the user's plan */}
          </div>
        )}

        {selectedSection === 'book-slot' && (
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-gray-700">Book Slot</h2>
            {/* Add content related to booking a slot */}
          </div>
        )}

        {selectedSection === 'events' && (
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-gray-700">Events</h2>
            {/* Add content related to events */}
          </div>
        )}

        {selectedSection === 'logout' && (
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-gray-700">Logging Out</h2>
            {/* Add content or trigger logout functionality */}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserPage;

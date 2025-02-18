import { useState, useEffect } from "react";
import { userLogo } from '../../../assets/index.assets.js';
import { FaEdit } from 'react-icons/fa';
import { fetchData } from "../../../services/api.service.js";
import { useAuthHandler } from '../../../hooks/authHandler.js';

const Avatar = () => {
  const user = JSON.parse(localStorage.getItem('userData')); // Parse the user data from localStorage
  let avatarUrl = user?.avatar || ''; // Use optional chaining to avoid errors if user is null
  const [profilePic, setProfilePic] = useState(userLogo);
  const [popup, setPopup] = useState({ message: '', type: '' }); // Popup state with message and type (success/error)
  const { refreshAndRetry, handleInvalidJWT } = useAuthHandler();

  useEffect(() => {
    if (avatarUrl.trim()) {
      setProfilePic(avatarUrl);
    }
  }, [avatarUrl]);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const formPayload = new FormData();
      formPayload.append('avatar', file);

      const options = {
        method: 'PATCH',
        data: null,
        file: formPayload,
        isBinary: true
      };

      try {
        const response = await fetchData('users/update-avatar', options);

        if (!response.success) {
          if (response.message === 'jwt expired') {
            const retryWithNewToken = await refreshAndRetry('users/update-avatar', options);
            if (!retryWithNewToken.success) {
              setPopup({ message: 'An error occurred. Please try again later.', type: 'error' });
              setTimeout(() => setPopup({ message: '', type: '' }), 5000);
              return;
            }
            setProfilePic(retryWithNewToken.avatar);
            localStorage.setItem('userData', JSON.stringify(retryWithNewToken))
            setPopup({ message: 'Profile picture updated successfully!', type: 'success' });
            setTimeout(() => setPopup({ message: '', type: '' }), 5000);
          } else if (response.message === 'jwt malformed' || response.message === 'invalid signature') {
            await handleInvalidJWT();
            return;
          } else {
            setPopup({ message: 'An error occurred. Please try again later.', type: 'error' });
            setTimeout(() => setPopup({ message: '', type: '' }), 5000);
            return;
          }
        } else {
          setProfilePic(response.data.avatar);
          localStorage.setItem('userData', JSON.stringify(response.data))
          setPopup({ message: 'Profile picture updated successfully!', type: 'success' });
          setTimeout(() => setPopup({ message: '', type: '' }), 5000);
        }
      } catch (error) {
        setPopup({ message: 'An error occurred. Please try again later.', type: 'error' });
        setTimeout(() => setPopup({ message: '', type: '' }), 5000);
      }
    }
  };

  return (
    <div className="relative group">
      {/* Popup Message */}
      {popup.message && (
        <div
          className={`fixed bottom-4 left-1/2 transform -translate-x-1/2 ${
            popup.type === 'success' ? 'bg-green-500' : 'bg-red-500'
          } text-white px-4 py-2 rounded-md shadow-lg z-50`}
        >
          {popup.message}
        </div>
      )}

      {/* Avatar Image */}
      <img
        src={profilePic}
        alt="Profile"
        className="rounded-full w-32 h-32 border-4 border-blue-200 shadow-xl mb-4 transform transition duration-300 hover:scale-105"
      />

      {/* Edit Button */}
      <label className="absolute bottom-2 right-2 bg-orange-500 p-2 rounded-full cursor-pointer hover:bg-orange-600 shadow-md transition duration-200">
        <FaEdit className="text-white" />
        <input type="file" className="hidden" name="avatar" onChange={handleFileChange} />
      </label>
    </div>
  );
};

export default Avatar;
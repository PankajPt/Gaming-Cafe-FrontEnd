import { useState } from "react";
import { userLogo } from '../../../assets/index.assets.js';
import { FaEdit } from 'react-icons/fa';
import { fetchData } from "../../../services/api.js";

const Avatar = () => {
      const [profilePic, setProfilePic] = useState(userLogo);
      const [popup, setPopup] = useState(null)
      const handleFileChange = async(e) => {
        const file = e.target.files[0];
        
        if (file) {
          const formPayload = new FormData()
          formPayload.append('avatar', file)
          console.log(formPayload)
          const options = {
            method: 'PATCH',
            data: null,
            file,
            isBinary: true
        }
        const response = await fetchData('users/update-avatar', options)
        if (!response.success) {
            if(response.message === 'jwt expired'){
              const retryWithNewToken = await refreshAndRetry('users/update-avatar', options)
              if(!retryWithNewToken.success){
                setPopup('An error occurred. Please try again later.');
                return
              }
              setProfilePic(retryWithNewToken.avatar); // Hide the verification banner
              setPopup('Profile picture updated successfully!');
    
            } else if (response.message === 'jwt malformed' || response.message === 'invalid signature'){
              await handleInvalidJWT()
              return
            }
            setPopup('An error occurred. Please try again later.');
            return
          }
        setProfilePic(response.avatar)
        }
      };
      return (
        <div className="relative group">
            <img
                src={profilePic}
                alt="Profile"
                className="rounded-full w-32 h-32 border-4 border-blue-200 shadow-xl mb-4 transform transition duration-300 hover:scale-105"
            />
            <label className="absolute bottom-2 right-2 bg-orange-500 p-2 rounded-full cursor-pointer hover:bg-orange-600 shadow-md transition duration-200">
                <FaEdit className="text-white" />
                <input type="file" className="hidden" name="avatar" onChange={handleFileChange} />
            </label>
        </div>
      )
}

export default Avatar
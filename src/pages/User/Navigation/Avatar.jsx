import { useState, useEffect } from "react";
import { userLogo } from '../../../assets/index.assets.js';
import { FaEdit } from 'react-icons/fa';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import { fetchData } from "../../../services/api.service.js";
import { useAuthHandler } from '../../../hooks/authHandler.js';
import { createPortal } from "react-dom";
import { toast } from "react-toastify";

const Avatar = () => {
  const user = JSON.parse(sessionStorage.getItem('userData'));
  let avatarUrl = user?.avatar || '';
  const [profilePic, setProfilePic] = useState(avatarUrl || userLogo);
  const [src, setSrc] = useState(null);
  const [crop, setCrop] = useState({ 
    aspect: 1,
    width: 128,  // Match avatar display size (w-32 = 128px)
    height: 128,
    unit: 'px'
  });
  const [imageRef, setImageRef] = useState(null);
  const { refreshAndRetry, handleInvalidJWT } = useAuthHandler();
  const [portalElement, setPortalElement] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Create a div for portal when component mounts
    const element = document.createElement('div');
    document.body.appendChild(element);
    setPortalElement(element);

    return () => {
      // Cleanup portal element when component unmounts
      document.body.removeChild(element);
    };
  }, []);

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setSrc(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const getCroppedImg = async (image, crop) => {
    const canvas = document.createElement('canvas');
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width * scaleX;
    canvas.height = crop.height * scaleY;
    const ctx = canvas.getContext('2d');

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width * scaleX,
      crop.height * scaleY
    );

    return new Promise((resolve) => {
      canvas.toBlob((blob) => resolve(blob), 'image/jpeg', 0.9);
    });
  };

  const uploadAvatarFile  = async (file) => {
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
              toast.error('An error occurred. Please try again later.')
              return;
            }
            setProfilePic(retryWithNewToken.avatar);
            sessionStorage.setItem('userData', JSON.stringify(retryWithNewToken))
            toast.success('Profile picture updated successfully!!!')
          } else if (response?.data?.forcedLogout) {
            await handleInvalidJWT();
            return;
          } else {
            toast.error('An error occurred. Please try again later.')
            return;
          }
        } else {
          setProfilePic(response.data.avatar);
          sessionStorage.setItem('userData', JSON.stringify(response.data))
          toast.success('Profile picture updated successfully!!!')
        }
      } catch (error) {
        toast.error('An error occurred. Please try again later.')
      }
  };

  const handleCropComplete = async () => {
    if (imageRef && crop.width && crop.height) {
      setIsLoading(true);
      try {
        const blob = await getCroppedImg(imageRef, crop);
        const file = new File([blob], 'avatar.jpg', { type: 'image/jpeg' });
        await uploadAvatarFile(file);
        setSrc(null);
      } catch (error) {
        toast.error('Failed to update avatar. Please try again.')
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="relative group">
      {/* Crop Modal */}
      {src && portalElement && createPortal(
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white p-4 rounded-lg max-w-lg w-full mx-4">
            <ReactCrop
              crop={crop}
              onChange={(c) => setCrop(c)}
              aspect={1}
              circularCrop={true}
            >
              <img
                src={src}
                onLoad={(e) => setImageRef(e.currentTarget)}
                alt="Crop preview"
                className="max-h-[70vh] object-contain"
              />
            </ReactCrop>
            <div className="flex justify-end mt-4 space-x-2">
              <button
                onClick={() => setSrc(null)}
                className="px-4 py-2 text-gray-600 bg-gray-100 rounded hover:bg-gray-200"
                disabled={isLoading}
              >
                Cancel
              </button>
              <button
                onClick={handleCropComplete}
                className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 disabled:bg-blue-300 flex items-center justify-center gap-2"
                disabled={isLoading}
              >
                {isLoading && (
                  <svg 
                    className="animate-spin h-5 w-5 text-white" 
                    xmlns="http://www.w3.org/2000/svg" 
                    fill="none" 
                    viewBox="0 0 24 24"
                  >
                    <circle 
                      className="opacity-25" 
                      cx="12" 
                      cy="12" 
                      r="10" 
                      stroke="currentColor" 
                      strokeWidth="4"
                    ></circle>
                    <path 
                      className="opacity-75" 
                      fill="currentColor" 
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                )}
                {isLoading ? 'Saving...' : 'Save'}
              </button>
            </div>
          </div>
        </div>,
        portalElement
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
        <input
          type="file"
          className="hidden"
          name="avatar"
          accept="image/*"
          onChange={handleFileSelect}
        />
      </label>
    </div>
  );
};

export default Avatar;
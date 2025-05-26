import { GiArtificialIntelligence, GiSpy, GiPadlock } from 'react-icons/gi';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { fetchData } from '../../../services/api.service.js';
import { useAuthHandler } from '../../../hooks/authHandler';

const UserDetails = ({ userDetails, isVerified }) => {
  const [email, setEmail] = useState(userDetails.email || '');
  const [isUpdating, setIsUpdating] = useState(false);
  const [showEmailInput, setShowEmailInput] = useState(false);
  const [emailUpdated, setEmailUpdated] = useState(false);
  const { refreshAndRetry, handleInvalidJWT } = useAuthHandler()

  const updateEmail = async () => {
    setIsUpdating(true);
    try {
      const options = {
        method: 'POST',
        data: { emailId: email },
        file: null,
        isBinary: false
      };
  
      const response = await fetchData('users/update-email', options);
  
      if (!response.success) {
        if (response.statusCode === 409 && response.message === 'Duplicate entry') {
          toast.error('This email is already registered with another user.');
        } else if (response.message === 'jwt expired') {
          const retryWithNewToken = await refreshAndRetry('users/update-email', options);
  
          if (!retryWithNewToken.success) {
            toast.error('An error occurred. Please try again later.');
            return;
          }
          sessionStorage.setItem('userData', JSON.stringify(retryWithNewToken.data));
  
          toast.success('Email updated successfully!');
          setShowEmailInput(false);
          setEmailUpdated(true);
          return;
        } else if (response?.data?.forcedLogout) {
          await handleInvalidJWT();
          return;
        } else {
          toast.error(response.message || 'Failed to update email. Please try again.');
          return;
        }
      }
      sessionStorage.setItem('userData', JSON.stringify(response.data));
      toast.success('Email updated successfully!');
      setShowEmailInput(false);
      setEmailUpdated(true);
    } catch (error) {
      toast.error('An error occurred. Please try again later.');
    } finally {
      setIsUpdating(false);
    }
  };
  

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-gradient-to-br from-blue-900/50 to-purple-900/30 p-6 rounded-2xl border-2 border-blue-500/30 shadow-[0_0_15px_-5px_rgba(59,130,246,0.3)]">
        <div className="flex items-center mb-4">
          <GiArtificialIntelligence className="text-2xl text-purple-400 mr-3" />
          <span className="text-sm font-semibold text-blue-300 uppercase tracking-wide">Digital Identity</span>
        </div>
        <p className="text-2xl font-bold text-blue-100">{userDetails.fullname}</p>
      </div>

      <div className="bg-gradient-to-br from-blue-900/50 to-purple-900/30 p-6 rounded-2xl border-2 border-blue-500/30 shadow-[0_0_15px_-5px_rgba(59,130,246,0.3)]">
        <div className="flex items-center mb-4">
          <GiSpy className="text-2xl text-purple-400 mr-3" />
          <span className="text-sm font-semibold text-blue-300 uppercase tracking-wide">Operative Handle</span>
        </div>
        <p className="text-2xl font-bold text-blue-100">@{userDetails.username}</p>
      </div>

      <div className="col-span-full bg-gradient-to-br from-blue-900/50 to-purple-900/30 p-6 rounded-2xl border-2 border-blue-500/30 shadow-[0_0_15px_-5px_rgba(59,130,246,0.3)]">
        <div className="flex items-center mb-4">
          <GiPadlock className="text-2xl text-purple-400 mr-3" />
          <span className="text-sm font-semibold text-blue-300 uppercase tracking-wide">Secure Channel</span>
        </div>
        <p className="text-2xl font-bold text-blue-100 break-all">{userDetails.email}</p>
        
        {!isVerified && !emailUpdated && (
          <>
            <button
              onClick={() => setShowEmailInput(!showEmailInput)}
              className="mt-2 bg-black/20 px-6 py-2 rounded-lg border-2 border-red-500/80 hover:border-red-400 transition-all duration-300 group"
            >
              <span className="text-red-400 neon-text-red font-mono hover:text-red-300 flex items-center">
                <GiPadlock className="mr-2 animate-pulse" />
                <span className="text-shadow-red-glow">Update Your Email Address</span>
              </span>
            </button>

            {showEmailInput && (
              <div className="mt-4 space-y-4">
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-3 bg-black/30 border-2 border-yellow-500/50 focus:border-yellow-400 rounded-lg font-mono text-yellow-300 placeholder-yellow-700 focus:ring-0 focus:shadow-[0_0_15px_0_rgba(234,179,8,0.3)] transition-all"
                    placeholder="Enter your new email"
                  />
                  <div className="absolute top-0 right-0 h-full flex items-center pr-3">
                    <GiSpy className="text-yellow-500 animate-pulse" />
                  </div>
                </div>

                <button
                  onClick={updateEmail}
                  className="w-full bg-gradient-to-r from-green-600/80 to-cyan-500/80 hover:from-green-500/90 hover:to-cyan-400/90 px-8 py-3 rounded-lg border-2 border-cyan-300/30 hover:border-cyan-200/50 transition-all duration-300 group relative overflow-hidden"
                  disabled={isUpdating}
                >
                  <span className="font-mono text-cyan-100 group-hover:text-white flex items-center justify-center">
                    {isUpdating ? (
                      <>
                        <span className="animate-pulse">Updating...</span>
                        <span className="ml-2 animate-spin">🛡️</span>
                      </>
                    ) : (
                      <>
                        <span className="text-shadow-cyan-glow">Save New Email</span>
                        <span className="ml-2 animate-bounce">⚡</span>
                      </>
                    )}
                  </span>
                  <div className="absolute inset-0 bg-noise-pattern opacity-20 pointer-events-none"></div>
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default UserDetails;
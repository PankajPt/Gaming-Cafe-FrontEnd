import { useState } from 'react';
import { FaCheckCircle, FaTimesCircle, FaKey, FaLockOpen } from 'react-icons/fa';
import { GiPadlock } from 'react-icons/gi';
import { fetchData } from '../../services/api.service';
import { useAuthHandler } from '../../hooks/authHandler.js';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PasswordUpdate = () => {
  const [showPasswordUpdate, setShowPasswordUpdate] = useState(false);
  const [passwords, setPasswords] = useState({
    current: '',
    newPassword: '',
    confirm: '',
  });

  const { refreshAndRetry, handleInvalidJWT } = useAuthHandler();

  const passwordsMatch = passwords.newPassword && passwords.newPassword === passwords.confirm;
  const isFormValid = passwords.current && passwords.newPassword && passwordsMatch;

  const handlePasswordChange = (e) => {
    setPasswords({
      ...passwords,
      [e.target.name]: e.target.value,
    });
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    try {
      const options = {
        method: 'POST',
        data: passwords,
        file: null,
        isBinary: false,
      };
      const response = await fetchData('users/reset-passwd-jwt', options);
      
      if (!response.success) {
        if (response.message === 'jwt expired') {
          const retryWithNewToken = await refreshAndRetry('users/reset-passwd-jwt', options);
          if (!retryWithNewToken.success) {
            toast.error(retryWithNewToken.message);
            return;
          }
          toast.success('Password updated successfully!');
        } else if (response?.data?.forcedLogout) {
          await handleInvalidJWT();
          return;
        }
        toast.error(response.message);
        return;
      }
      
      toast.success('Password updated successfully!');
      setPasswords({ current: '', newPassword: '', confirm: '' });
      setTimeout(() => setShowPasswordUpdate(false), 2000);
    } catch (error) {
      toast.error('Failed to update password. Please try again.');
      console.error('Error updating password:', error);
    }
  };

  return (
    <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl border-2 border-blue-500/30 shadow-lg p-6">
      <ToastContainer position="top-right" autoClose={3000} />
      
      <button
        onClick={() => setShowPasswordUpdate(!showPasswordUpdate)}
        className="w-full p-4 flex items-center justify-between transition-all bg-gray-800 hover:bg-gray-700 rounded-xl"
      >
        <div className="flex items-center space-x-4">
          <GiPadlock className="text-2xl text-purple-400" />
          <span className="text-xl font-bold text-blue-200">Security Protocol Management</span>
        </div>
        <span className="text-blue-400">{showPasswordUpdate ? '▲ Collapse' : '▼ Access'}</span>
      </button>

      {showPasswordUpdate && (
        <form onSubmit={handlePasswordSubmit} className="mt-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="flex items-center text-blue-300 text-sm font-semibold">
                <FaKey className="mr-2 text-purple-400" /> Current Cipher
              </label>
              <input
                type="password"
                name="current"
                value={passwords.current}
                onChange={handlePasswordChange}
                className="w-full bg-gray-800 border border-blue-500/30 rounded-xl p-3 text-blue-100 focus:ring-2 focus:ring-purple-500"
                autoComplete="current-password"
              />
            </div>

            <div className="space-y-2">
              <label className="flex items-center text-blue-300 text-sm font-semibold">
                <FaLockOpen className="mr-2 text-purple-400" /> New Encryption Key
              </label>
              <input
                type="password"
                name="newPassword"
                value={passwords.newPassword}
                onChange={handlePasswordChange}
                className="w-full bg-gray-800 border border-blue-500/30 rounded-xl p-3 text-blue-100 focus:ring-2 focus:ring-purple-500"
                autoComplete="new-password"
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <label className="flex items-center text-blue-300 text-sm font-semibold">
                <GiPadlock className="mr-2 text-purple-400" /> Confirm Encryption Key
              </label>
              <input
                type="password"
                name="confirm"
                value={passwords.confirm}
                onChange={handlePasswordChange}
                className="w-full bg-gray-800 border border-blue-500/30 rounded-xl p-3 text-blue-100 focus:ring-2 focus:ring-purple-500"
                autoComplete="new-password"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={!isFormValid}
            className={`w-full py-3 rounded-xl font-bold transition-all text-white
              ${isFormValid 
                ? 'bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-400 hover:to-blue-400 shadow-lg shadow-blue-500/50 hover:scale-105'
                : 'bg-gray-700/50 cursor-not-allowed opacity-50'}`}
          >
            Initiate Security Override
          </button>
          
        </form>
      )}
    </div>
  );
};

export default PasswordUpdate;

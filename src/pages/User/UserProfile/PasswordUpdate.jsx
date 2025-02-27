// PasswordUpdate.jsx
import { FaCheckCircle, FaTimesCircle, FaKey, FaLockOpen } from 'react-icons/fa';
import { GiPadlock } from 'react-icons/gi';

const PasswordUpdate = ({ showPasswordUpdate, ...props }) => {
  return (
    <div className="bg-gradient-to-br from-blue-900/50 to-purple-900/30 rounded-2xl border-2 border-blue-500/30 shadow-[0_0_15px_-5px_rgba(59,130,246,0.3)]">
      <button
        onClick={() => props.setShowPasswordUpdate(!showPasswordUpdate)}
        className={`w-full p-4 flex items-center justify-between transition-all ${
          showPasswordUpdate ? 'bg-blue-500/20' : 'hover:bg-blue-500/10'
        }`}
      >
        <div className="flex items-center space-x-4">
          <GiPadlock className="text-2xl text-purple-400" />
          <span className="text-xl font-bold text-blue-200 font-orbitron">
            Security Protocol Management
          </span>
        </div>
        <span className="text-blue-400">
          {showPasswordUpdate ? '▲ Collapse' : '▼ Access'}
        </span>
      </button>

      {showPasswordUpdate && (
        <form onSubmit={props.handlePasswordSubmit} className="p-6 space-y-6 animate-slideDown">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Current Password */}
            <div className="space-y-2">
              <label className="flex items-center text-blue-300 text-sm font-semibold">
                <FaKey className="mr-2 text-purple-400" />
                Current Cipher
              </label>
              <input
                type="password"
                name="current"
                value={props.passwords.current}
                onChange={props.handlePasswordChange}
                className="w-full bg-gray-900/30 border-2 border-blue-500/30 rounded-xl p-3 text-blue-100 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-500/50"
                autoComplete="current-password"
              />
            </div>

            {/* New Password */}
            <div className="space-y-2">
              <label className="flex items-center text-blue-300 text-sm font-semibold">
                <FaLockOpen className="mr-2 text-purple-400" />
                New Encryption Key
              </label>
              <input
                type="password"
                name="newPassword"
                value={props.passwords.newPassword}
                onChange={props.handlePasswordChange}
                className="w-full bg-gray-900/30 border-2 border-blue-500/30 rounded-xl p-3 text-blue-100 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-500/50"
                autoComplete="new-password"
              />
            </div>

            {/* Confirm Password */}
            <div className="space-y-2 md:col-span-2">
              <label className="flex items-center text-blue-300 text-sm font-semibold">
                <GiPadlock className="mr-2 text-purple-400" />
                Confirm Encryption Key
              </label>
              <div className="relative">
                <input
                  type="password"
                  name="confirm"
                  value={props.passwords.confirm}
                  onChange={props.handlePasswordChange}
                  className="w-full bg-gray-900/30 border-2 border-blue-500/30 rounded-xl p-3 text-blue-100 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-500/50 pr-12"
                  autoComplete="new-password"
                />
                {props.passwords.confirm.length > 0 && (
                  <span className="absolute right-4 top-4">
                    {props.passwordsMatch ? (
                      <FaCheckCircle className="text-green-400 animate-pulse" />
                    ) : (
                      <FaTimesCircle className="text-red-400 animate-pulse" />
                    )}
                  </span>
                )}
              </div>
            </div>

            {/* Status Messages */}
            {props.updateStatus && (
              <div className={`md:col-span-2 p-4 rounded-xl border-2 ${
                props.updateStatus.type === 'success' 
                  ? 'border-green-400/30 bg-green-900/20 text-green-400' 
                  : 'border-red-400/30 bg-red-900/20 text-red-400'
              }`}>
                {props.updateStatus.message}
              </div>
            )}

            {/* Submit Button */}
            <div className="md:col-span-2">
              <button
                type="submit"
                disabled={!props.passwordsMatch || !props.passwords.current}
                className={`w-full py-3 px-6 rounded-xl font-bold transition-all ${
                  props.passwordsMatch && props.passwords.current
                    ? 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 shadow-purple-glow'
                    : 'bg-gray-700/50 cursor-not-allowed'
                }`}
              >
                Initiate Security Override
              </button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};

export default PasswordUpdate;
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

const PasswordUpdate = ({showPasswordUpdate, setShowPasswordUpdate, passwords, handlePasswordChange, passwordsMatch, updateStatus, handlePasswordSubmit }) => {
    return (
        <>
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
        </>
    )
}

export default PasswordUpdate
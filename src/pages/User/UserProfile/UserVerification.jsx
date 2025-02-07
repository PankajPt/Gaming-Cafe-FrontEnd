const UserVerification = ({isVerified, sendVerificationMail, verificationError, isVerificationSent}) => {
    return (
        <>
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
        </>
    )
}

export default UserVerification
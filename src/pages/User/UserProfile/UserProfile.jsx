import UserVerification from './UserVerification.jsx';
import UserDetails from './UserDetails.jsx';
import PasswordUpdate from './PasswordUpdate.jsx';

const UserProfile = ({ userDetails, isVerified, isVerificationSent, verificationError, sendVerificationMail, showPasswordUpdate, setShowPasswordUpdate, passwords, passwordsMatch, handlePasswordChange, handlePasswordSubmit, updateStatus }) => {
  return (
    <div className="bg-white p-8 rounded-2xl shadow-2xl space-y-6">
        <h1 className="text-4xl font-bold text-blue-600 mb-6">Profile Settings</h1>

      <UserVerification 
        isVerified={isVerified}
        isVerificationSent={isVerificationSent}
        verificationError={verificationError}
        sendVerificationMail={sendVerificationMail}
      />

      <UserDetails userDetails={userDetails} />

      <PasswordUpdate
        showPasswordUpdate={showPasswordUpdate}
        setShowPasswordUpdate={setShowPasswordUpdate}
        passwords={passwords}
        passwordsMatch={passwordsMatch}
        handlePasswordChange={handlePasswordChange}
        handlePasswordSubmit={handlePasswordSubmit}
        updateStatus={updateStatus}
      />
    </div>
  );
};

export default UserProfile;
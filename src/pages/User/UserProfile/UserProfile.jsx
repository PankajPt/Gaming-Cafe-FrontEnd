// UserProfile.jsx
import UserVerification from './UserVerification.jsx';
import UserDetails from './UserDetails.jsx';
import PasswordUpdate from './PasswordUpdate.jsx';
import { GiSpellBook } from 'react-icons/gi';

const UserProfile = ({ userDetails, isVerified, ...props }) => {
  return (
    <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-8 rounded-3xl shadow-2xl border-2 border-blue-500/30 space-y-8">
      <div className="flex items-center justify-between border-b-2 border-blue-500/30 pb-6">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent font-orbitron">
          Player Manifest
        </h1>
        <GiSpellBook className="text-4xl text-blue-400 animate-pulse" />
      </div>

      <UserVerification 
        isVerified={isVerified}
        {...props}
      />

      <UserDetails userDetails={userDetails} />

      <PasswordUpdate {...props} />
    </div>
  );
};

export default UserProfile;
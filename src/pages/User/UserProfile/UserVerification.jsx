// UserVerification.jsx
import { FaShieldAlt, FaEnvelopeOpenText } from 'react-icons/fa';
import { GiPlasmaBolt } from 'react-icons/gi';

const UserVerification = ({ isVerified, ...props }) => {
  if (isVerified) return (
    <div className="bg-gradient-to-r from-green-900/30 to-blue-900/30 p-4 rounded-2xl border-2 border-green-500/30 flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <GiPlasmaBolt className="text-3xl text-green-400 animate-pulse" />
        <div>
          <h3 className="text-green-400 font-bold text-lg font-orbitron">Identity Confirmed</h3>
          <p className="text-green-300 text-sm">Full system access granted</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-4">
      {!props.isVerificationSent && (
        <div className="bg-gradient-to-r from-yellow-900/30 to-amber-900/30 p-4 rounded-2xl border-2 border-yellow-500/30 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <FaShieldAlt className="text-3xl text-yellow-400" />
            <div>
              <h3 className="text-yellow-400 font-bold text-lg font-orbitron">Identity Verification Required</h3>
              <p className="text-yellow-300 text-sm">Access limited to basic functions</p>
            </div>
          </div>
          <button
            onClick={props.sendVerificationMail}
            className="bg-gradient-to-r from-yellow-600 to-amber-600 hover:from-yellow-700 hover:to-amber-700 text-white px-6 py-2 rounded-xl shadow-yellow-glow transition-all"
          >
            Initiate Verification
          </button>
        </div>
      )}

      {props.verificationError && (
        <div className="bg-gradient-to-r from-red-900/30 to-rose-900/30 p-4 rounded-2xl border-2 border-red-500/30 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <FaShieldAlt className="text-3xl text-red-400" />
            <div>
              <h3 className="text-red-400 font-bold text-lg font-orbitron">Security Protocol Failure</h3>
              <p className="text-red-300 text-sm">{props.verificationError}</p>
            </div>
          </div>
        </div>
      )}

      {props.isVerificationSent && (
        <div className="bg-gradient-to-r from-green-900/30 to-emerald-900/30 p-4 rounded-2xl border-2 border-green-500/30 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <FaEnvelopeOpenText className="text-3xl text-green-400" />
            <div>
              <h3 className="text-green-400 font-bold text-lg font-orbitron">Verification Sequence Initiated</h3>
              <p className="text-green-300 text-sm">Security token dispatched to registered Channel</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserVerification;
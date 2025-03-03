import { useState } from 'react';
import { FaShieldAlt, FaEnvelopeOpenText } from 'react-icons/fa';
import { GiPlasmaBolt } from 'react-icons/gi';
import { fetchData } from '../../../services/api.service.js';
import { useAuthHandler } from '../../../hooks/authHandler';

const UserVerification = ({ isVerified }) => {

  const [isVerificationSent, setIsVerificationSent] = useState(false);
  const [verificationError, setVerificationError] = useState(null);
  const { refreshAndRetry, handleInvalidJWT } = useAuthHandler()

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

  const sendVerificationMail = async () => {
      try {
        const options = {
          method: 'GET',
          data: null,
          file: null,
          isBinary: false
      }
        const response = await fetchData('users/send-verification-link', options)
        if (!response.success) {
          if(response.message === 'jwt expired'){
            const retryWithNewToken = await refreshAndRetry('users/send-verification-link', options)
            if(!retryWithNewToken.success){
              setVerificationError('An error occurred. Please try again later.');
              return
            }
            setIsVerificationSent(true); // Hide the verification banner
            alert('Verification email sent successfully! Please check your inbox.');
  
          } else if (response.message === 'jwt malformed' || response.message === 'invalid signature' || response.message === 'Unauthorized request'){
            await handleInvalidJWT()
            return
          } else {
            setVerificationError(response.message || 'Failed to send verification email. Please try again.');
            return
          }
        }
        setIsVerificationSent(true); // Hide the verification banner
        alert('Verification email sent successfully! Please check your inbox.');
      } catch (error) {
        // E-UVCB: Error from user verification catch block
        setVerificationError('E-UVCB: An error occurred. Please try again later.');
      } finally {
        setTimeout(()=>{
          setVerificationError(null);
        }, 5000)
      }
    };

  return (
    <div className="space-y-4">
      {!isVerificationSent && (
        <div className="bg-gradient-to-r from-yellow-900/30 to-amber-900/30 p-4 rounded-2xl border-2 border-yellow-500/30 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <FaShieldAlt className="text-3xl text-yellow-400" />
            <div>
              <h3 className="text-yellow-400 font-bold text-lg font-orbitron">Identity Verification Required</h3>
              <p className="text-yellow-300 text-sm">Access limited to basic functions</p>
            </div>
          </div>
          <button
            onClick={sendVerificationMail}
            className="bg-gradient-to-r from-yellow-600 to-amber-600 hover:from-yellow-700 hover:to-amber-700 text-white px-6 py-2 rounded-xl shadow-yellow-glow transition-all"
          >
            Initiate Verification
          </button>
        </div>
      )}

      {verificationError && (
        <div className="bg-gradient-to-r from-red-900/30 to-rose-900/30 p-4 rounded-2xl border-2 border-red-500/30 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <FaShieldAlt className="text-3xl text-red-400" />
            <div>
              <h3 className="text-red-400 font-bold text-lg font-orbitron">Security Protocol Failure</h3>
              <p className="text-red-300 text-sm">{verificationError}</p>
            </div>
          </div>
        </div>
      )}

      {isVerificationSent && (
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
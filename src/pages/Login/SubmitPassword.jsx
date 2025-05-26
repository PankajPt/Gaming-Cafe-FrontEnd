import { useState, useEffect } from 'react';
import { FaCheckCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const SubmitPasswordForm = () => {
  const [formData, setFormData] = useState({
    newPassword: '',
    confirmPassword: ''
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [passwordCriteria, setPasswordCriteria] = useState({
    hasMinLength: false,
    hasUpperCase: false,
    hasNumber: false,
    hasSpecialChar: false,
  });

  const checkPasswordStrength = (password) => {
    const criteria = {
      hasMinLength: password.length >= 8,
      hasUpperCase: /[A-Z]/.test(password),
      hasNumber: /\d/.test(password),
      hasSpecialChar: /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password),
    };
    setPasswordCriteria(criteria);
    const metCount = Object.values(criteria).filter(Boolean).length;
    setPasswordStrength((metCount / 4) * 100);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (name === 'newPassword') {
      checkPasswordStrength(value);
    }
  };

  useEffect(() => {
    const { newPassword, confirmPassword } = formData;
    const passwordsMatch = newPassword && confirmPassword && newPassword === confirmPassword;
    const strongEnough = passwordStrength >= 100;

    if (!newPassword || !confirmPassword) {
      setErrorMessage('');
      setIsSubmitDisabled(true);
    } else if (!passwordsMatch) {
      setErrorMessage('Passwords do not match!');
      setIsSubmitDisabled(true);
    } else if (!strongEnough) {
      setErrorMessage('Password does not meet strength criteria!');
      setIsSubmitDisabled(true);
    } else {
      setErrorMessage('');
      setIsSubmitDisabled(false);
    }
  }, [formData.newPassword, formData.confirmPassword, passwordStrength]);

  const getStrengthColor = () => {
    const hue = passwordStrength * 1.2;
    return `hsl(${hue}, 100%, 50%)`;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitted:', formData);
    toast.success("Password reset successfully!");
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4 font-pixel">
      <div className="relative w-full max-w-md">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-500 rounded-lg blur opacity-30 z-0 pointer-events-none" />
        <form
          onSubmit={handleSubmit}
          className="relative z-10 bg-gray-800 p-8 rounded-lg w-full border-2 border-purple-500 shadow-glow"
        >
          <h1 className="text-3xl text-purple-400 mb-8 text-center font-bold">
            SET NEW PASSWORD
          </h1>

          <div className="mb-6">
            <label htmlFor="new-password" className="block text-purple-300 mb-2 text-sm uppercase">
              New Password
            </label>
            <input
              type="password"
              id="new-password"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-gray-900 border-2 border-purple-600 rounded-lg text-white focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-600 transition-all duration-200 placeholder-purple-700"
              placeholder="••••••••"
            />
          </div>

          <div className="mb-6">
            <label htmlFor="confirm-password" className="block text-purple-300 mb-2 text-sm uppercase">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirm-password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-gray-900 border-2 border-purple-600 rounded-lg text-white focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-600 transition-all duration-200 placeholder-purple-700"
              placeholder="••••••••"
            />
          </div>

          {errorMessage && (
            <div className="mb-4 text-red-400 text-sm animate-pulse">
              ⚠️ {errorMessage}
            </div>
          )}

          <div className="space-y-2">
            <div className="h-2 rounded-full bg-gray-700 overflow-hidden">
              <div
                className="h-full transition-all duration-300"
                style={{
                  width: `${passwordStrength}%`,
                  background: getStrengthColor()
                }}
              />
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className={`flex items-center ${passwordCriteria.hasMinLength ? 'text-green-400' : 'text-gray-400'}`}>
                <FaCheckCircle className="mr-1" /> 8+ Characters
              </div>
              <div className={`flex items-center ${passwordCriteria.hasUpperCase ? 'text-green-400' : 'text-gray-400'}`}>
                <FaCheckCircle className="mr-1" /> Uppercase
              </div>
              <div className={`flex items-center ${passwordCriteria.hasNumber ? 'text-green-400' : 'text-gray-400'}`}>
                <FaCheckCircle className="mr-1" /> Number
              </div>
              <div className={`flex items-center ${passwordCriteria.hasSpecialChar ? 'text-green-400' : 'text-gray-400'}`}>
                <FaCheckCircle className="mr-1" /> Special Char
              </div>
            </div>
          </div>

          <div className="mt-6">
            <button
              type="submit"
              disabled={isSubmitDisabled}
              className={`w-full py-3 px-6 rounded-lg font-bold uppercase transition-all duration-300 ${
                isSubmitDisabled
                  ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                  : 'bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-500 hover:to-blue-400 text-white hover:scale-105'
              }`}
            >
              CONFIRM
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SubmitPasswordForm;

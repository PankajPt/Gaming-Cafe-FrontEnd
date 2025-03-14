import React, { useState } from "react";
import { FaUser, FaEnvelope, FaLock, FaCamera, FaCheckCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { fetchData } from "../../services/api.service.js";
import './register.css'

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    fullname: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    avatar: null,
  });

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
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
    const strength = (metCount / 4) * 100;
    setPasswordStrength(strength);
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "avatar") {
      setFormData((prev) => ({ ...prev, [name]: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
      
      if (name === "password") {
        checkPasswordStrength(value);
      }
    }
  };

  const isFormValid = () => {
    return (
      formData.fullname &&
      formData.username &&
      formData.email &&
      formData.password &&
      formData.password === formData.confirmPassword &&
      passwordStrength >= 75
    );
  };

  const navigate = useNavigate()
  
  const getStrengthColor = () => {
    const hue = (passwordStrength * 1.2); // 0-120 (red to green)
    return `hsl(${hue}, 100%, 50%)`;
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    if (!isFormValid()) {
      setLoading(false)
      setError("Please fill out all required fields.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    if (passwordStrength < 75) {
      setError("Password does not meet complexity requirements");
      setLoading(false);
      return;
    }

    try {
      const formPayload = new FormData();
      formPayload.append('fullname', formData.fullname);
      formPayload.append('username', formData.username);
      formPayload.append('email', formData.email);
      formPayload.append('password', formData.password);
      
      if (formData.avatar) formPayload.append('avatar', formData.avatar);

      const options = {
        method: 'POST',
        data: null,
        file: formPayload,
        isBinary: true
      }
      const response = await fetchData('users/register', options)

      if (!response.success) {
        setError(response.message || 'Something went wrong during registration.')
        return
      }
      setSuccess(true);
      setTimeout(() => {
        navigate('/login')
      }, 5000);
    } catch (err) {
      setError(err.message || "Something went wrong during registration.");
    } finally {
      setLoading(false)
    }
  };

  return (
  <div className="min-h-screen bg-gradient-to-br from-gray-900 to-blue-900 flex items-center justify-center px-4">
    <div className="w-full max-w-md transform transition-all duration-300 hover:scale-[1.01] form-container">
      <div className="bg-gray-800/50 rounded-2xl shadow-2xl p-8 space-y-6 relative overflow-hidden border-2 border-purple-500/30 backdrop-blur-lg">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-blue-500/5 pointer-events-none" />
          
          <div className="text-center space-y-2">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent font-orbitron">
              JOIN THE ARENA
            </h1>
            <p className="text-gray-400">Forge your gaming identity</p>
          </div>

          {success && (
            <div className="bg-green-900/20 p-4 rounded-lg border-2 border-green-400/30 flex items-center gap-3">
              <FaCheckCircle className="text-green-400 text-xl" />
              <span className="text-green-400">Registration successful! Redirecting...</span>
            </div>
          )}

          {error && (
            <div className="bg-red-900/20 p-4 rounded-lg border-2 border-red-400/30 flex items-center gap-3">
              <FaCheckCircle className="text-red-400 text-xl" />
              <span className="text-red-400">{error}</span>
            </div>
          )}

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className={`relative group ${error ? 'error-glow' : (isFormValid() ? 'success-glow' : '')}`}>
              <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-400 group-focus-within:text-blue-400 transition-colors" />
              <input
                type="text"
                name="fullname"
                placeholder="Full Name"
                value={formData.fullname}
                onChange={handleChange}
                className="w-full pl-12 pr-4 py-3 rounded-xl bg-gray-900/30 border-2 border-purple-500/30 focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20 text-gray-100 placeholder-gray-400 transition-all"
              />
            </div>

            <div className={`relative group ${error ? 'error-glow' : ''} !border-red-500`}>
              <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-400 group-focus-within:text-blue-400 transition-colors" />
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
                className="w-full pl-12 pr-4 py-3 rounded-xl bg-gray-900/30 border-2 border-purple-500/30 focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20 text-gray-100 placeholder-gray-400 transition-all shadow-[0_0_15px_-5px_rgba(99,102,241,0.3)] focus:shadow-blue-500/20"
              />
            </div>

            <div className={`relative group ${error ? 'error-glow' : ''} !border-red-500`}>
              <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-400 group-focus-within:text-blue-400 transition-colors" />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                className="w-full pl-12 pr-4 py-3 rounded-xl bg-gray-900/30 border-2 border-purple-500/30 focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20 text-gray-100 placeholder-gray-400 transition-all shadow-[0_0_15px_-5px_rgba(99,102,241,0.3)] focus:shadow-blue-500/20"
              />
            </div>

            <div className={`relative group ${error ? 'error-glow' : ''} !border-red-500`}>
              <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-400 group-focus-within:text-blue-400 transition-colors" />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="w-full pl-12 pr-4 py-3 rounded-xl bg-gray-900/30 border-2 border-purple-500/30 focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20 text-gray-100 placeholder-gray-400 transition-all shadow-[0_0_15px_-5px_rgba(99,102,241,0.3)] focus:shadow-blue-500/20"
              />
            </div>

            <div className={`relative group ${error ? 'error-glow' : ''} !border-red-500`}>
              <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-400 group-focus-within:text-blue-400 transition-colors" />
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full pl-12 pr-4 py-3 rounded-xl bg-gray-900/30 border-2 border-purple-500/30 focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20 text-gray-100 placeholder-gray-400 transition-all shadow-[0_0_15px_-5px_rgba(99,102,241,0.3)] focus:shadow-blue-500/20"
              />
            </div>
            
             {/* Password Strength Indicator */}
            <div className="space-y-2">
              <div className="h-2 rounded-full bg-gray-700 overflow-hidden">
                <div 
                  className="h-full transition-all duration-300" 
                  style={{ 
                    width: `${passwordStrength}%`,
                    background: getStrengthColor()
                  }}
                ></div>
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
            <div className={`relative group ${error ? 'error-glow' : ''} !border-red-500`}>
              <FaCamera className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-400 group-focus-within:text-blue-400 transition-colors" />
              <input
                type="file"
                name="avatar"
                onChange={handleChange}
                className="w-full pl-12 pr-4 py-3 rounded-xl bg-gray-900/30 border-2 border-purple-500/30 text-gray-100 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-purple-500/20 file:text-purple-400 hover:file:bg-purple-500/30 transition-all"
              />
            </div>

            {loading ? (
              <div className="flex justify-center items-center space-x-2 text-blue-400">
                <div className="w-6 h-6 border-4 border-t-4 border-blue-400 rounded-full animate-spin"></div>
                <span>Initializing Protocol...</span>
              </div>
            ) : (
              <button
                type="submit"
                disabled={!isFormValid() || loading}
                className={`w-full py-3 px-6 rounded-xl font-bold transition-all ${
                  isFormValid() && !loading
                    ? 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 shadow-[0_0_20px_-5px_rgba(99,102,241,0.5)] hover:shadow-blue-500/40'
                    : 'bg-gray-700/50 cursor-not-allowed'
                }`}
              >
                ACTIVATE PROFILE
              </button>
            )}
          </form>

          <p className="text-center text-gray-400">
            Already have an account?{" "}
            <a href="login" className="text-blue-400 hover:text-purple-400 underline hover:no-underline transition-colors">
              Access Terminal
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
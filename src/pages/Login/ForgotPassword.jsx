import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setSuccessMessage(null);
    setErrorMessage(null);

    try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_BASE_URI}/users/reset-passwd-onEmail`, 
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({email})
            }
        )
    const responseData = await response.json()
    if (!response.ok) {
        setErrorMessage(responseData.message || 'Something went wrong!');
        return;
    }
    setSuccessMessage(responseData.message);
    setTimeout(() => navigate('/login'), 5000);

    } catch (error) {
        setErrorMessage('Network error! Please try again.');
    } finally {
        setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900 p-4">
      {/* Custom Animations */}
      <style>
        {`
          @keyframes float {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
          }
          .animate-float {
            animation: float 3s ease-in-out infinite;
          }
        `}
      </style>

      <div className="relative w-full max-w-md px-8 py-12 space-y-8 bg-gray-900 rounded-3xl shadow-2xl border-2 border-indigo-500 transform transition-transform duration-500 hover:scale-105 group">
        {/* Glowing Border Effect */}
        <div className="absolute -inset-2 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-3xl blur opacity-30 group-hover:opacity-50 transition duration-500 animate-pulse pointer-events-none"></div>

        {/* Floating Icon */}
        <div className="animate-float text-center">
          <svg 
            className="w-20 h-20 mx-auto text-purple-400" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
        </div>

        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
            Reset Your Password
          </h1>
          <p className="text-gray-300 text-lg">Enter your email to continue your quest</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative group">
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Gamer email"
              className="w-full px-4 py-3 text-gray-100 bg-gray-800 rounded-lg border-2 border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 placeholder:text-gray-400 transition-all pr-12 
                        hover:border-purple-500 hover:shadow-glow"
              required
            />
            <svg
              className="absolute right-3 top-3.5 w-6 h-6 text-gray-400 group-hover:text-purple-400 transition-colors"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full px-6 py-3 text-lg font-semibold text-white bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg 
                      hover:from-purple-500 hover:to-indigo-500 transition-all transform hover:scale-[1.02] 
                      flex items-center justify-center gap-2 relative overflow-hidden
                      disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                <span>Sending...</span>
              </>
            ) : (
              <>
                <span>Send Reset Link</span>
                <svg 
                  className="w-5 h-5 animate-pulse" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </>
            )}
          </button>
        </form>
        
        {/* Success Error message section: */}
        {successMessage && (
          <div className="text-center p-3 text-green-400 bg-green-900/20 rounded-lg border border-green-400/30 animate-fade-in">
            ✅ {successMessage}
          </div>
        )}

        {errorMessage && (
        <div className="text-center p-3 text-red-400 bg-red-900/20 rounded-lg border border-red-400/30 animate-fade-in">
            ⚠️ {errorMessage}
        </div>
        )}

        <div className="text-center text-gray-400 text-sm">
          Remember your password?{' '}
          <Link 
            to="/login" 
            className="text-purple-400 hover:text-purple-300 font-semibold underline transition-colors 
                      hover:scale-105 inline-block hover:animate-pulse"
          >
            Continue Gaming
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
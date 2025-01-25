import React, { useState } from "react";

const LoginPage = () => {
  const [error, setError] = useState(null);  // Manage error state
  const [attemptFailed, setAttemptFailed] = useState(false);  // Track failed attempts

  const handleSubmit = (e) => {
    e.preventDefault();
    // Dummy logic for failed login attempt
    const isLoginValid = false;  // This would be replaced with actual login logic

    if (isLoginValid) {
      // Redirect or continue if login is successful
    } else {
      // Set error message after failed attempt
      setError("Invalid email or password.");
      setAttemptFailed(true);
    }
  };

  return (
    <div className="relative isolate bg-white px-6 py-24 sm:py-32 lg:px-8">
      <div className="mx-auto max-w-4xl text-center">
        <h2 className="text-3xl font-bold text-indigo-600">Login</h2>
        <p className="mt-2 text-lg text-gray-600">Access your account to manage your plans and settings.</p>
      </div>
      <div className="mx-auto mt-16 w-full max-w-md p-8 space-y-6 bg-white text-black rounded-3xl shadow-lg ring-1 ring-gray-300 transition-transform duration-300 hover:bg-gray-800 hover:text-white hover:scale-105 hover:shadow-xl hover:ring-indigo-500">
        
        {/* Error Message Section */}
        {error && (
          <div className="text-center text-red-600 bg-red-100 p-2 rounded-lg mb-4">
            {error}
          </div>
        )}
        
        <form className="space-y-4" onSubmit={handleSubmit}>  {/* Reduced space between input fields */}
          <div className="pt-6">  {/* Increased padding above the input */}
            <input
              type="text"
              id="email"
              placeholder="Enter your email or username"
              className="w-full px-4 py-3 text-gray-900 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600 placeholder:text-gray-900 transition duration-300 hover:bg-gray-200"
            />
          </div>
          <div className="pt-2">  {/* Padding above the password input */}
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              className="w-full px-4 py-3 text-gray-900 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600 transition duration-300 hover:bg-gray-200"
            />
          </div>
          
          {/* Reduced space between password and login button */}
          <button
            type="submit"
            className="w-full px-4 py-3 text-white bg-indigo-600 rounded-lg hover:bg-indigo-500 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition duration-300 mt-4"
          >
            Login
          </button>
        </form>
        
        {/* "Forgot Password?" Link: Only visible on failed attempts */}
        {attemptFailed && (
          <p className="text-sm text-center text-indigo-500 mt-4">
            <a href="/forgot-password" className="hover:underline">
              Forgot Password?
            </a>
          </p>
        )}

        <p className="text-sm text-center text-gray-400 mt-4">
          Don't have an account?{" "}
          <a href="/register" className="text-indigo-500 hover:underline">
            Register
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;

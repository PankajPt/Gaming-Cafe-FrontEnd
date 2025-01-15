import React from "react";

const LoginPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="w-full max-w-md p-8 space-y-6 bg-gray-800 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center text-white">Login</h2>
        <form className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-lg text-gray-300">
            </label>
            <input
              type="email"
              id="email"
              placeholder="Email Address or Username"
              className="w-full px-4 py-2 mt-1 text-black-900 bg-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 placeholder: text-black-900"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-lg text-gray-300">
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              className="w-full px-4 py-2 mt-1 text-gray-900 bg-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
          >
            Login
          </button>
        </form>
        <p className="text-sm text-center text-gray-400">
          Don't have an account?{" "}
          <a href="/register" className="text-blue-400 hover:underline">
            Register
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;

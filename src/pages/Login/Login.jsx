import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/Auth.Context.jsx";

const LoginPage = () => {
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const { login, userRole } = useAuth();
  const navigate = useNavigate();

  // Enable button only when both fields are filled
  const isFormValid = formData.username.trim() !== "" && formData.password.trim() !== "";

  useEffect(() => {
    if (userRole === "admin") {
      navigate("/admin");
    } else if (userRole === "manager") {
      navigate("/manager");
    } else if (userRole === "user") {
      navigate("/user");
    }
  }, [userRole, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    if (!isFormValid) {
      setIsLoading(false);
      setError("Username and password are required to continue.");
      return;
    }

    const response = await login(formData.username, formData.password);
    setIsLoading(false);

    if (typeof response === "string") {
      setError(response);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900">
      <div className="relative w-full max-w-md px-8 py-12 space-y-8 bg-gray-900 rounded-3xl shadow-2xl border-2 border-indigo-500 transform transition-transform duration-500 hover:scale-105 group">
        <div className="absolute -inset-2 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-3xl blur opacity-30 group-hover:opacity-50 transition duration-500 animate-pulse pointer-events-none"></div>
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
            Player Login
          </h1>
          <p className="text-gray-300 text-lg">Continue your gaming journey</p>
        </div>

        {error && (
          <div className="p-3 text-red-400 bg-red-900/50 rounded-lg border border-red-400/50">
            ⚠️ {error}
          </div>
        )}

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div className="relative">
              <input
                id="username"
                type="text"
                value={formData.username}
                onChange={handleInputChange}
                placeholder="Username or Email-Id"
                className="w-full px-4 py-3 text-gray-100 bg-gray-800 rounded-lg border-2 border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 placeholder:text-gray-400 transition-all"
              />
              <svg
                className="absolute right-3 top-3.5 w-6 h-6 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>

            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Password"
                className="w-full px-4 py-3 text-gray-100 bg-gray-800 rounded-lg border-2 border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 placeholder:text-gray-400 transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3.5 text-gray-400 hover:text-indigo-400 transition-colors"
              >
                {showPassword ? "👁️" : "👁️‍🗨️"}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={!isFormValid || isLoading}
            className={`w-full px-6 py-3 text-lg font-semibold text-white rounded-lg transition-all transform hover:scale-[1.02] flex items-center justify-center gap-2 ${
              !isFormValid || isLoading
                ? "bg-gray-600 cursor-not-allowed"
                : "bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500"
            }`}
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                <span>Authenticating...</span>
              </>
            ) : (
              <>
                <span>Login</span>
                <svg className="w-5 h-5 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </>
            )}
          </button>
        </form>

        <div className="text-center space-y-4">
          <div className="text-gray-400 text-sm">
            Not registered?{" "}
            <Link
              to="/register"
              className="text-purple-400 hover:text-purple-300 font-semibold underline transition-colors hover:scale-105 inline-block"
            >
              Create account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

import React, { useState } from "react";
import { FaUser, FaEnvelope, FaLock, FaCamera, FaCheckCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { fetchData } from "../../services/api";


const RegisterPage = () => {
  const [formData, setFormData] = useState({
    fullname: "",
    username: "",
    email: "",
    password: "",
    avatar: null,
  });

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);


  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "avatar") {
      setFormData((prev) => ({ ...prev, [name]: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
    console.log(files)
  };
  

  const isFormValid = () => {
    return formData.fullname && formData.username && formData.email && formData.password;
  };

  const navigate = useNavigate()
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    if (!isFormValid()) {
      setLoading(false)
      setError("Please fill out all required fields.");
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
      
    console.log(options)
      const response = await fetchData('users/register', options)

      if (!response.success) {
        const errorData = await response.json()
        setError(errorData.message || 'Something went wrong during registration.')
        return
      }
      setSuccess(true);
      setTimeout(() => {
        navigate('/login')
      }, 2000);
    } catch (err) {
      setError(err.message || "Something went wrong during registration.");
    } finally {
      setLoading(false)
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md transform transition-all duration-300 hover:scale-[1.01]">
        <div className="bg-white rounded-3xl shadow-2xl p-8 space-y-6 relative overflow-hidden">
          {/* <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 to-blue-500 opacity-5" /> */}
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 to-blue-500 opacity-5 pointer-events-none" />
          <div className="text-center space-y-2">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-blue-500 bg-clip-text text-transparent">
              Join Our Community
            </h1>
            <p className="text-gray-500">Create your account in seconds</p>
          </div>

          {success && (
            <div className="bg-green-100 p-4 rounded-lg flex items-center gap-3">
              <FaCheckCircle className="text-green-600 text-xl" />
              <span className="text-green-600">Registration successful! Redirecting...</span>
            </div>
          )}

          {error && (
            <div className="bg-red-100 p-4 rounded-lg flex items-center gap-3">
              <FaCheckCircle className="text-red-600 text-xl" />
              <span className="text-red-600">{error}</span>
            </div>
          )}

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="relative">
              <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                name="fullname"
                placeholder="Full Name"
                value={formData.fullname}
                onChange={handleChange}
                className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all"
              />
            </div>

            <div className="relative">
              <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
                className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all"
              />
            </div>

            <div className="relative">
              <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all"
              />
            </div>

            <div className="relative">
              <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all"
              />
            </div>

            <div className="relative">
              <FaCamera className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="file"
                name="avatar"
                onChange={handleChange}
                className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-200 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
              />
            </div>
            {loading ? (
              <div className="flex justify-center items-center space-x-2">
                <div className="w-6 h-6 border-4 border-t-4 border-indigo-600 rounded-full animate-spin"></div>
                <span>Loading...</span>
              </div>
            ) : (
              <button
                type="submit"
                disabled={!isFormValid() || loading}
                className={`w-full py-3 px-6 rounded-lg font-medium text-white transition-all ${
                  isFormValid() && !loading
                    ? 'bg-gradient-to-r from-indigo-600 to-blue-500 hover:from-indigo-700 hover:to-blue-600 shadow-lg hover:shadow-indigo-200'
                    : 'bg-gray-300 cursor-not-allowed'
                }`}
              >
                Create Account
              </button>
            )}
          </form>

          <p className="text-center text-gray-500">
            Already have an account?{" "}
            <a href="login" className="text-indigo-600 hover:underline font-medium">
              Sign in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
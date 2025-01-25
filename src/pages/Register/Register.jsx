import React, { useState } from "react";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    profilePicture: null,  // Optional field
  });

  const [error, setError] = useState(null);

  // Handle input changes and update form data
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "profilePicture") {
      setFormData((prevData) => ({
        ...prevData,
        [name]: files[0],  // Save the file object for profile picture
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  // Check if all required fields are filled
  const isFormValid = () => {
    return formData.name && formData.username && formData.email && formData.password;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormValid()) {
      // Dummy registration logic
      const isRegisterValid = true;
      if (isRegisterValid) {
        // Redirect or continue if registration is successful
      } else {
        setError("Something went wrong during registration.");
      }
    } else {
      setError("Please fill out all required fields.");
    }
  };

  return (
    <div className="relative isolate bg-white px-6 py-24 sm:py-32 lg:px-8">
      <div className="mx-auto max-w-4xl text-center">
        <h2 className="text-3xl font-bold text-indigo-600">Register</h2>
        <p className="mt-2 text-lg text-gray-600">Create an account to get started with our platform.</p>
      </div>
      <div className="mx-auto mt-16 w-full max-w-md p-8 space-y-6 bg-white text-black rounded-3xl shadow-lg ring-1 ring-gray-300 transition-transform duration-300 hover:bg-gray-800 hover:text-white hover:scale-105 hover:shadow-xl hover:ring-indigo-500">
        
        {/* Error Message Section */}
        {error && (
          <div className="text-center text-red-600 bg-red-100 p-2 rounded-lg mb-4">
            {error}
          </div>
        )}

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="pt-6">
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-3 text-gray-900 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600 placeholder:text-gray-900 transition duration-300 hover:bg-gray-200"
            />
          </div>
          <div className="pt-4">
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Enter Username"
              value={formData.username}
              onChange={handleChange}
              className="w-full px-4 py-3 text-gray-900 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600 placeholder:text-gray-900 transition duration-300 hover:bg-gray-200"
            />
          </div>
          <div className="pt-4">
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 text-gray-900 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600 placeholder:text-gray-900 transition duration-300 hover:bg-gray-200"
            />
          </div>
          <div className="pt-4">
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Create a password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-3 text-gray-900 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600 transition duration-300 hover:bg-gray-200"
            />
          </div>
          <div className="pt-4">
            <label htmlFor="profilePicture" className="block text-sm text-gray-600">
              Profile Picture (Optional)
            </label>
            <input
              type="file"
              id="profilePicture"
              name="profilePicture"
              accept="image/*"
              onChange={handleChange}
              className="w-full px-4 py-3 text-gray-900 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600 transition duration-300 hover:bg-gray-200"
            />
          </div>

          <button
            type="submit"
            disabled={!isFormValid()}  // Disable button if form is not valid
            className={`w-full px-4 py-3 text-white ${isFormValid() ? 'bg-green-600' : 'bg-gray-400'} rounded-lg hover:${isFormValid() ? 'bg-green-700' : 'bg-gray-500'} focus:ring-2 focus:ring-green-500 focus:ring-offset-2 mt-6`}
          >
            Register
          </button>
        </form>

        {/* "Already have an account?" Link */}
        <p className="text-sm text-center text-gray-400 mt-4">
          Already have an account?{" "}
          <a href="/login" className="text-green-500 hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;

import React, { useState } from "react";
import axios from "axios";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = formData;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/auth/signup", formData);
      console.log(response.data);
      // Redirect or show success message
    } catch (error) {
      console.error("Sign Up failed", error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-800">
      <form
        className="w-full max-w-md p-6 bg-gray-900 rounded-lg shadow-lg"
        onSubmit={handleSubmit}
      >
        <h2 className="text-3xl text-center text-orange-400 mb-6">Sign Up</h2>
        <input
          type="text"
          name="name"
          value={name}
          onChange={handleChange}
          placeholder="Full Name"
          className="w-full p-3 mb-4 rounded-md bg-gray-700 text-white"
        />
        <input
          type="email"
          name="email"
          value={email}
          onChange={handleChange}
          placeholder="Email"
          className="w-full p-3 mb-4 rounded-md bg-gray-700 text-white"
        />
        <input
          type="password"
          name="password"
          value={password}
          onChange={handleChange}
          placeholder="Password"
          className="w-full p-3 mb-4 rounded-md bg-gray-700 text-white"
        />
        <button
          type="submit"
          className="w-full p-3 bg-orange-400 text-white rounded-md hover:bg-orange-500"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default Signup;

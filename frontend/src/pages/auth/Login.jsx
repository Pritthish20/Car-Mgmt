import React, { useState } from "react";
import axios from "axios";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

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
      const response = await axios.post("http://localhost:5000/api/auth/login", formData);
      console.log(response.data);
      // Store token, redirect to dashboard, etc.
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-800">
      <form
        className="w-full max-w-md p-6 bg-gray-900 rounded-lg shadow-lg"
        onSubmit={handleSubmit}
      >
        <h2 className="text-3xl text-center text-orange-400 mb-6">Login</h2>
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
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;

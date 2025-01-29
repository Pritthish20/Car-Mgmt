import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import {toast} from 'react-toastify'
import { logout } from "../redux/slice/authSlice";
import { useLogoutMutation } from "../redux/api/authApi";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutCall().unwrap();
      dispatch(logout());
      navigate("/login");
      toast.success("Logged out successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to log out. Please try again!");
    }
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav className="bg-gray-900 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
        {/* Logo Section */}
        <div className="text-3xl font-bold text-orange-400">
          <Link to="/">Car Mgmt</Link>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6">
          <Link to="/" className="hover:text-orange-400">
            All Products
          </Link>
          <Link to="/create-product" className="hover:text-orange-400">
            Create Product
          </Link>
          <button onClick={logoutHandler} className="hover:text-orange-400">
            Log Out
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-orange-400">
            {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden ${isMenuOpen ? "block" : "hidden"} bg-gray-800 px-6 py-3`}
      >
        <Link to="/" className="block py-2 text-lg text-white hover:text-orange-400">
          All Products
        </Link>
        <Link to="/create-product" className="block py-2 text-lg text-white hover:text-orange-400">
          Create Product
        </Link>
        <button onClick={logoutHandler} className="block py-2 text-lg text-white hover:text-orange-400">
          Log Out
        </button>
      </div>
    </nav>
  );
};

export default Navbar;

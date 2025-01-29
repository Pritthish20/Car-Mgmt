import { useState} from "react";
import {  useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { setUserInfo } from "../../redux/slice/authSlice";
import { useSigninMutation } from "../../redux/api/authApi";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const dispatch = useDispatch();
    const navigate = useNavigate();
  
    const [signup, { isLoading }] = useSigninMutation();

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
      const res = await signup({...formData }).unwrap();
      dispatch(setUserInfo({ ...res }));
      navigate('/')
      toast.success("Signed in successfully!");
    } catch (error) {
      console.error("Login failed", error);
      toast.error("Error occurred, please try again.");
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
          value={formData.name}
          onChange={handleChange}
          placeholder="Full Name"
          className="w-full p-3 mb-4 rounded-md bg-gray-700 text-white"
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          className="w-full p-3 mb-4 rounded-md bg-gray-700 text-white"
        />
        <input
          type="password"
          name="password"
          value={formData.password}
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

        {/* Login Link */}
        <div className="mt-4 text-center">
          <p className="text-gray-400">
            Already have an account?{" "}
            <a
              href="/login"
              className="text-orange-400 hover:text-orange-500"
            >
              Log In
            </a>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Signup;

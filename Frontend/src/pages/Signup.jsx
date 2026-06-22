import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const [error, setError]=useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/user/signup`,
        formData,{
          withCredentials: true,
        }
      );

      navigate("/Login");
    } catch (err) {
      setError(
            err.response?.data?.error ||
            "Signup Failed"
        );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-black via-gray-900 to-purple-950 px-4 py-8">
      <div className="w-full max-w-md sm:max-w-lg bg-gray-900/80 backdrop-blur-lg border border-purple-500/20 rounded-2xl shadow-2xl p-5 sm:p-8">

        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-white">
            Create Account
          </h1>

          <p className="text-gray-400 mt-2">
            Join our blogging community
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >
          {
              error && (
                  <div className="bg-red-500/20 border border-red-500 text-red-300 px-4 py-3 rounded-lg">
                      {error}
                  </div>
              )
          }
          <div>
            <label className="block text-gray-300 mb-2">
              Full Name
            </label>

            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Enter your full name"
              required
              className="w-full px-4 py-3 text-sm sm:text-base bg-gray-800 border border-gray-700 rounded-lg text-white outline-none focus:border-purple-500"
            />
          </div>

          <div>
            <label className="block text-gray-300 mb-2">
              Email
            </label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
              className="w-full px-4 py-3 text-sm sm:text-base bg-gray-800 border border-gray-700 rounded-lg text-white outline-none focus:border-purple-500"
            />
          </div>

          <div>
            <label className="block text-gray-300 mb-2">
              Password
            </label>

            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Create a password"
              required
              className="w-full px-4 py-3 text-sm sm:text-base bg-gray-800 border border-gray-700 rounded-lg text-white outline-none focus:border-purple-500"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 text-sm sm:text-base bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition"
          >
            Create Account
          </button>
        </form>

        <p className="text-center text-gray-400 mt-6">
          Already have an account?
          <Link
            to="/login"
            className="text-purple-400 hover:text-purple-300 ml-2"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
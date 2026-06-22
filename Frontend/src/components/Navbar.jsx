import { Link } from "react-router-dom";
import {useState, useEffect} from "react";
import axios from "axios"

const Navbar = (props) => {
  const [showMenu, setShowMenu] = useState(false);

  const handleLogout = async () => {
    try {
      await axios.get(
        `${import.meta.env.VITE_API_URL}/user/logout`,
        {
          withCredentials: true,
        }
      );

      props.setUser(null);
      navigate("/login");

      } catch (error) {
      console.log(error);
      }
    };

  return (
    <nav className="bg-gray-900 text-white shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
        <Link
          to="/"
          className="text-2xl font-bold text-purple-500"
        >
          Blogify
        </Link>

        {/* Links */}
        <div className="flex items-center gap-6">
          <Link to="/" className="hover:text-purple-400">
            Home
          </Link>

        {
        props.user ? ( <div className="flex items-center gap-4">

          <Link
            to="/create"
            className="hover:text-purple-400 transition"
          >
            Create Blog
          </Link>

          <div className="relative">

            <button
              onClick={() => setShowMenu(!showMenu)}
              className="flex items-center gap-1 hover:text-purple-400 transition"
            >
              {props.user.fullName}
              <span>▼</span>
              </button>

              {showMenu && (
                <div className="absolute right-0 mt-6 w-40 bg-gray-900 border border-gray-700 rounded-lg shadow-lg overflow-hidden">

                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-3 hover:bg-gray-800 transition"
                  >
                    Logout
                  </button>

                </div>
              )}

            </div>

          </div>

          ) : ( <Link
            to="/login"
            className="bg-purple-600 px-4 py-2 rounded-lg hover:bg-purple-700 transition"
          >
          Login </Link>
          )
          }

        </div>
      </div>
    </nav>
  );
};

export default Navbar;
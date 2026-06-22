import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Home = () => {
const [blogs, setBlogs] = useState([]);
const [search, setSearch] = useState("");

useEffect(() => {

  const fetchBlogs = async () => {

    try {

      let url = `${import.meta.env.VITE_API_URL}/blog`;

      if (search.trim()) {
        url = `${import.meta.env.VITE_API_URL}/blog/search/${search}`;
      }

      const res = await axios.get(url);

      setBlogs(res.data);

    } catch (error) {
      console.log(error);
    }
  };

  fetchBlogs();

}, [search]);

return (
  
    <div className="min-h-screen bg-linear-to-br from-black via-gray-900 to-purple-950 px-6 py-10">

        <div className="max-w-2xl mx-auto mb-10">
          <input
            type="text"
            placeholder="Search blogs..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-6 py-4 rounded-2xl bg-gray-900 border border-purple-500/20 text-white outline-none focus:border-purple-500"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

            {blogs.map((blog) => (

                <div
                    key={blog._id}
                    className="bg-gray-900 border border-purple-500/20 rounded-2xl overflow-hidden shadow-lg hover:scale-105 transition duration-300"
                >

                    <img
                        src={`${import.meta.env.VITE_API_URL}${blog.coverImage}`}
                        alt={blog.title}
                        className="w-full h-56 object-cover"
                    />

                    <div className="p-5">

                        <h2 className="text-2xl font-semibold text-white mb-3">
                            {blog.title}
                        </h2>

                        <div className="flex justify-between items-center">

                            <div>
                                <p className="text-purple-400">
                                    {blog.createdBy?.fullName}
                                </p>

                                <p className="text-gray-500 text-sm">
                                    {new Date(
                                        blog.createdAt
                                    ).toLocaleDateString()}
                                </p>
                            </div>

                            <Link to={`/blog/${blog._id}`} className="bg-purple-600 px-4 py-2 rounded-lg hover:bg-purple-700 transition">
                                Read More
                            </Link>

                        </div>

                    </div>

                </div>

            ))}

        </div>

    </div>
);
};

export default Home;

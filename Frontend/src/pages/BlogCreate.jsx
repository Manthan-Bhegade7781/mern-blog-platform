import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const BlogCreate = () => {
const navigate = useNavigate();

const [formData, setFormData] = useState({
  title: "",
  body: "",
  coverImage: "",
});

const [error, setError] = useState("");
const [loading, setLoading] = useState(false);

const handleChange = (e) => {
  setFormData({
  ...formData,
  [e.target.name]: e.target.value,
  });
};

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const data = new FormData();

    data.append("title", formData.title);
    data.append("body", formData.body);
    data.append("coverImage", formData.coverImage);

    setLoading(true);
    setError("");

    await axios.post(
      `${import.meta.env.VITE_API_URL}/blog/add-blog`,
      data,
      {
        withCredentials: true,
      }
    );

    navigate("/");
  } catch (err) {
    setError(
      err.response?.data?.message ||
        "Failed to create blog"
    );
  } finally {
    setLoading(false);
  }
};

return ( <div className="min-h-screen bg-linear-to-br from-black via-gray-900 to-purple-950 flex justify-center items-center px-4 py-10">

  <div className="w-full max-w-3xl bg-gray-900/80 backdrop-blur-lg border border-purple-500/20 rounded-2xl shadow-2xl p-6 md:p-10">

    <h1 className="text-4xl font-bold text-white text-center mb-2">
      Create New Blog
    </h1>

    <p className="text-gray-400 text-center mb-8">
      Share your thoughts with the world 
    </p>

    {error && (
      <div className="mb-6 bg-red-500/20 border border-red-500 text-red-300 px-4 py-3 rounded-lg">
        {error}
      </div>
    )}

    <form
      onSubmit={handleSubmit}
      className="space-y-6"
      encType="multipart/form-data"
    >
      <div>
        <div>
          <label className="block text-gray-300 mb-2">
            Cover Image
          </label>

          <label
          htmlFor="coverImage"
          className="flex flex-col items-center justify-center w-full h-52 border-2 border-dashed border-purple-500 rounded-xl cursor-pointer bg-gray-800 hover:bg-gray-700 transition"
          >

          {formData.coverImage ? (
            <>
              <img
                src={URL.createObjectURL(formData.coverImage)}
                alt="Preview"
                className="h-32 w-full object-cover rounded-lg mb-3"
              />
              <p className="text-purple-400 font-medium">
                {formData.coverImage.name}
              </p>
            </>
          ) : (
            <>
              <svg
                className="w-12 h-12 text-purple-400 mb-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                />
              </svg>

              <p className="text-gray-300 text-lg">
                Click to upload cover image
              </p>

              <p className="text-gray-500 text-sm mt-2">
                PNG, JPG, JPEG (Max 5MB)
              </p>
            </>
          )}

        </label>

          <input
            id="coverImage"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) =>
            setFormData({
            ...formData,
            coverImage: e.target.files[0],
            })
          }
          />

          </div>

      </div>


      <div>
        <label className="block text-gray-300 mb-2">
          Blog Title
        </label>

        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Enter blog title"
          required
          className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white outline-none focus:border-purple-500"
        />
      </div>

      <div>
        <label className="block text-gray-300 mb-2">
          Blog Content
        </label>

        <textarea
          name="body"
          value={formData.body}
          onChange={handleChange}
          rows="10"
          placeholder="Write your blog here..."
          required
          className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white outline-none resize-none focus:border-purple-500"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full py-3 bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white font-semibold rounded-lg transition"
      >
        {loading ? "Publishing..." : "Publish Blog"}
      </button>

    </form>
  </div>
</div>
);
};

export default BlogCreate;

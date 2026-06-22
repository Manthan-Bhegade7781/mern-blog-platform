import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";

const BlogDetails = ({ user }) => {
const { id } = useParams();


const [blog, setBlog] = useState(null);
const [comments, setComments] = useState([]);
const [comment, setComment] = useState("");

const isOwner =
user &&
blog &&
user.id === blog.createdBy._id;

useEffect(() => {
const fetchBlog = async () => {
try {
const res = await axios.get(
    `${import.meta.env.VITE_API_URL}/blog/${id}`
    );
        setBlog(res.data);
    } catch (error) {
        console.log(error);
    }
    };

    fetchBlog();

}, [id]);

const navigate = useNavigate();

const handleDelete = async () => {

const confirmDelete = window.confirm(
    "Are you sure you want to delete this blog?"
    );

    if (!confirmDelete) return;

    try {
    await axios.delete(
    `${import.meta.env.VITE_API_URL}/blog/${id}`,
    {
        withCredentials: true,
    }
    );

    navigate("/");

    } catch (error) {
    console.log(error);
    }
};

useEffect(() => {
  const fetchComments = async () => {

    const res = await axios.get(
      `${import.meta.env.VITE_API_URL}/comment/${id}`
    );

    setComments(res.data);
  };

  fetchComments();
}, [id]);

const handleComment = async () => {

  await axios.post(
    `${import.meta.env.VITE_API_URL}/comment/${id}`,
    {
      content: comment,
    },
    {
      withCredentials: true,
    }
  );

  setComment("");

  const res = await axios.get(
    `${import.meta.env.VITE_API_URL}/comment/${id}`
  );

  setComments(res.data);
};

const handleDeleteComment = async (commentId) => {

  const confirmDelete = window.confirm(
    "Delete this comment?"
  );

  if (!confirmDelete) return;

  try {

    await axios.delete(
      `${import.meta.env.VITE_API_URL}/comment/${commentId}`,
      {
        withCredentials: true,
      }
    );

    setComments(
      comments.filter(
        (comment) => comment._id !== commentId
      )
    );

  } catch (error) {
    console.log(error);
  }
};

if (!blog) {
    return ( <div className="min-h-screen bg-linear-to-br from-black via-gray-900 to-purple-950 flex items-center justify-center"> <div className="animate-pulse text-3xl text-purple-400 font-semibold">
    Loading Blog... </div> </div>
    );
}

return ( <div className="min-h-screen bg-linear-to-br from-black via-gray-900 to-purple-950 py-12 px-4">

  <div className="max-w-5xl mx-auto">

    {/* Main Card */}
    <div className="bg-gray-900/70 backdrop-blur-xl border border-purple-500/20 rounded-3xl overflow-hidden shadow-[0_0_40px_rgba(168,85,247,0.15)]">

      {/* Cover Image */}
      <div className="overflow-hidden">
        <img
          src={`${import.meta.env.VITE_API_URL}${blog.coverImage}`}
          alt={blog.title}
          className="w-full h-125 object-cover hover:scale-105 transition duration-700"
        />
      </div>

      <div className="p-6 md:p-12">

        {/* Author Info */}
        <div className="flex items-center justify-between mb-8 flex-wrap gap-4">

          <div className="flex items-center gap-4">

            <div className="w-14 h-14 rounded-full bg-purple-600 flex items-center justify-center text-white text-xl font-bold">
              {blog.createdBy?.fullName?.charAt(0)}
            </div>

            <div>
              <h3 className="text-white text-lg font-semibold">
                {blog.createdBy?.fullName}
              </h3>

              <p className="text-gray-400 text-sm">
                {new Date(
                  blog.createdAt
                ).toLocaleDateString()}
              </p>
            </div>
          </div>

          <span className="bg-purple-600/20 text-purple-300 px-4 py-2 rounded-full text-sm">
            {Math.ceil(blog.body.split(" ").length / 200)} min read
          </span>

        </div>

        {/* Title */}
        <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight mb-10">
          {blog.title}
        </h1>

        {/* Divider */}
        <div className="w-full h-px bg-gray-700 mb-10"></div>

        {/* Blog Content */}
        <article className="prose prose-invert max-w-none">

          <div className="text-gray-300 text-lg leading-10 whitespace-pre-wrap tracking-wide">
            {blog.body}
          </div>

        </article>

        <div className="mt-10 space-y-6 bg-gray-800/60 backdrop-blur-lg border border-purple-500/20 rounded-2xl p-6">
            <h2 className="text-3xl font-bold text-white mb-8">
                Comments ({comments.length})
            </h2>
            {comments.length === 0 ? (

                <div className="text-center py-10 text-gray-400">
                No comments yet. Be the first to comment 
                </div>

            ) : (

                comments.map((comment) => (

                <div
                    key={comment._id}
                    className="bg-gray-800/50 backdrop-blur-lg border border-gray-700 hover:border-purple-500/30 transition rounded-2xl p-6"
                >

                    <div className="flex items-start gap-4">

                    {/* Avatar */}
                    <div className="w-9 h-9 rounded-full bg-linear-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-lg">
                        {comment.createdBy.fullName.charAt(0)}
                    </div>

                    {/* Content */}
                    <div className="flex-1">

                        <div className="flex justify-between items-center mb-2">
                            <div className="flex items-center gap-2">
                                <h3 className="text-white font-semibold">
                                    {comment.createdBy.fullName}
                                </h3>

                                <span className="text-gray-500 text-sm">
                                    •
                                </span>

                                <p className="text-gray-500 text-sm">
                                    {formatDistanceToNow(
                                    new Date(comment.createdAt),
                                    { addSuffix: true }
                                    )}
                                </p>
                            </div>
                            <div>
                                    {user && user.id === comment.createdBy._id && (
                                        <button
                                        onClick={() =>
                                            handleDeleteComment(comment._id)
                                        }
                                        className="bg-blur border text-red-500 px-3 py-2 rounded-full hover:text-red-600 transition font-medium"
                                        >
                                        Delete
                                        </button>
                                    )}
                            </div>
                                        
                        </div>

                        <p className="text-gray-300 leading-7">
                        {comment.content}
                        </p>

                    </div>

                    </div>

                </div>

                ))

            )}

            </div>

        <div className="mt-16">
            <h2 className="text-3xl font-bold text-white mb-8">
                Discussion
            </h2>

            {user ? (

                <div className="bg-gray-800/60 backdrop-blur-lg border border-purple-500/20 rounded-2xl p-6">
                <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Share your thoughts..."
                    rows={4}
                    className="w-full bg-gray-900 border border-gray-700 rounded-xl p-4 text-white outline-none focus:border-purple-500 resize-none"
                />

                <div className="flex justify-end mt-4">
                    <button
                    onClick={handleComment}
                    className="bg-purple-600 hover:bg-purple-700 px-8 py-3 rounded-xl text-white font-semibold transition duration-300"
                    >
                    Post Comment
                    </button>
                </div>
                </div>
            ) : (
                <div className="bg-gray-800/60 border border-purple-500/20 rounded-2xl p-8 text-center">
                <h3 className="text-white text-xl mb-3">
                    Join the Discussion
                </h3>

                <p className="text-gray-400 mb-6">
                    Please login to add a comment.
                </p>

                <Link
                    to="/login"
                    className="inline-block bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-xl text-white font-semibold transition"
                >
                    Login
                </Link>
                </div>
            )}
            </div>
        
        <div>
            {isOwner && (
                <div className="flex gap-4 mt-10">
                <Link to={`/blog/edit/${blog._id}`}
                className="bg-yellow-500 hover:bg-yellow-600 px-6 py-3 rounded-lg text-white font-semibold transition"
                >
                Edit Blog
                </Link>

                <button
                onClick={handleDelete}
                className="bg-red-600 hover:bg-red-700 px-6 py-3 rounded-lg text-white font-semibold transition"
                >
                Delete Blog
                </button>

                </div>
                )}

        </div>

      </div>
    </div>

  </div>
</div>

);
};

export default BlogDetails;

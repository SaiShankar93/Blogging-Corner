import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { allBlogs } from '../redux/Blogs';
import Navbar from './Navbar';

function Home() {
  const [blogs, setBlogs] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_PORT}/post/all`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json"
          },
        });
        const blogs = await res.json();
        blogs.reverse();
        setBlogs(blogs);
        dispatch(allBlogs(blogs));
        console.log(blogs);
      } catch (error) {
        console.error('Error fetching blogs:', error.message);
      }
    };

    fetchBlogs();
  }, [dispatch]);

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <div className="container mx-auto p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map((blog) => (
            <div key={blog._id} className="bg-white rounded-lg shadow-lg p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="text-gray-700 font-semibold">
                    {blog.author}
                  </div>
                  <div className="text-gray-500 text-sm">
                    {new Date(blog.createdAt).toLocaleString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: '2-digit',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </div>
                </div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                  {blog.postTitle}
                </h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  {blog.postBody.substring(0, 200) + " ..."}
                </p>
              </div>
              {blog.imageUrl && (
                <img
                  src={blog.imageUrl}
                  alt={blog.postTitle}
                  className="rounded-lg object-cover h-48 w-full mb-4"
                />
              )}
              <a className="text-indigo-600 font-semibold hover:text-indigo-400 transition duration-200" href={`/post/posts/${blog.postTitle}`}>
                Read More
                <svg className="w-4 h-4 ml-1 inline-block" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14"></path>
                  <path d="M12 5l7 7-7 7"></path>
                </svg>
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;

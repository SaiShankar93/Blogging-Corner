import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';

function BlogList() {
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const username = localStorage.getItem("username");
                const response = await fetch(`${import.meta.env.VITE_PORT}/post/myblogs?username=${username}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const fetchedBlogs = await response.json();
                setBlogs(fetchedBlogs.blogs);
            } catch (error) {
                console.error('Error fetching blogs:', error);
            }
        };
        fetchBlogs();
    }, []);

    return (
        <>
            <div className="bg-gray-100 min-h-screen">
                <Navbar />
                <div className="container mx-auto py-10 px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {blogs.length > 0 ? (
                            blogs.map(post => (
                                <div key={post._id} className="bg-white rounded-lg shadow-lg p-6 flex flex-col justify-between">
                                    <div>
                                        <div className="flex items-center justify-between mb-4">
                                            <div className="text-gray-700 font-semibold">
                                                {post.author}
                                            </div>
                                            <div className="text-gray-500 text-sm">
                                                {new Date(post.createdAt).toLocaleString('en-US', {
                                                    year: 'numeric',
                                                    month: 'short',
                                                    day: '2-digit',
                                                    hour: '2-digit',
                                                    minute: '2-digit'
                                                })}
                                            </div>
                                        </div>
                                        <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                                            {post.postTitle}
                                        </h2>
                                        <p className="text-gray-700 leading-relaxed mb-4">
                                            {post.postBody.substring(0, 200) + " ..."}
                                        </p>
                                    </div>
                                    <a
                                        className="text-indigo-600 font-semibold hover:text-indigo-400 transition duration-200"
                                        href={`/post/posts/${post.postTitle}`}
                                    >
                                        Read More
                                        <svg
                                            className="w-4 h-4 ml-1 inline-block"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            fill="none"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        >
                                            <path d="M5 12h14"></path>
                                            <path d="M12 5l7 7-7 7"></path>
                                        </svg>
                                    </a>
                                </div>
                            ))
                        ) : (
                            <div className="text-gray-700 text-lg font-semibold text-center col-span-full">
                                No Blogs Found
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

export default BlogList;

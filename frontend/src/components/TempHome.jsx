import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { allBlogs } from '../redux/Blogs';
import Navbar from './Navbar';
// import 'dotenv/config';

function Home() {
    const [blogs, setBlogs] = useState([]);
    console.log(import.meta.env.VITE_PORT)
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchBlogs = async () => {
            console.log(import.meta.env.VITE_PORT)
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
                dispatch(allBlogs(blogs))
            } catch (error) {
                console.error('Error submitting:', error.message);
            }
        };
        fetchBlogs();
    }, []);
    return (
        <>
        <div className="">

            <Navbar />
            <div className="p-4 divide-y-2 divide-gray-300 z-50">
                {/* Render the fetched blogs here */}
                {blogs.map((blog) => (
                    // console.log(blog),
                    <div key={blog._id} className="ml-0 py-8 flex flex-wrap md:flex-nowrap md:ml-24">
                        <div className="md:w-64 md:mb-0 mb-6 flex-shrink-0 flex flex-col w-full">
                            <span className="font-semibold title-font text-gray-700">
                                {blog.author}
                            </span>
                            <span className="mt-1 text-gray-500 text-sm">
                                {new Date(blog.createdAt).toLocaleString('en-US', {
                                    year: 'numeric',
                                    month: 'short',
                                    day: '2-digit',
                                    hour: '2-digit',
                                    minute: '2-digit'
                                })}
                            </span>
                        </div>
                        <div className="md:flex-grow">
                            <h2 className="text-3xl font-medium text-gray-900 title-font mb-2">
                                {blog.postTitle}
                            </h2>
                            <p className="leading-relaxed">
                                {blog.postBody.substring(0, 500) + " ..."}
                            </p>
                            <a className="text-indigo-900 inline-flex items-center mt-4" href={(`/post/posts/${(blog.postTitle)}`)}>Read More
                                <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                    <path d="M5 12h14"></path>
                                    <path d="M12 5l7 7-7 7"></path>
                                </svg>
                            </a>
                        </div>
                    </div>
                ))}
            </div>
                </div>
        </>

    );
}

export default Home;

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from './Navbar';
import { MdDelete } from "react-icons/md";

function Post() {
    let { postName } = useParams();
    const [postData, setPostData] = useState(null);
    const username = localStorage.getItem('username');
    const isLoggedIn = localStorage.getItem('isLoggedIn');

    const deleteBlog = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_PORT}/post/delete/${postName}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            window.location.href = '/';
        } catch (error) {
            console.error('Error deleting blog:', error);
        }
    }

    useEffect(() => {
        const fetchPostData = async () => {
            const username = localStorage.getItem('username');
            try {
                const response = await fetch(`${import.meta.env.VITE_PORT}/post/posts/${postName}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }); 
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const data = await response.json();
                setPostData(data);
                console.log(data)
            } catch (error) {
                console.error('Error fetching post data:', error);
            }
        };

        fetchPostData();
    }, [postName]);

    if (!postData) {
        return <div>Loading...</div>;
    }

    const { postTitle, author, time, postBody, imageUrl } = postData;

    // Extract the first image URL from the array
    const imageSrc = imageUrl && imageUrl.length > 0 ? imageUrl[0] : null;

    return (
        <div className="bg-gray-100 min-h-screen">
            <Navbar />
            <div className="container mx-auto py-10 px-4 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-semibold text-center text-gray-900 mb-8">{postTitle}</h1>
                <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-6">
                    <div className="text-center text-gray-700 mb-4">
                        <p>Written by {author}</p>
                        <p>{new Date(time).toLocaleString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: '2-digit',
                            hour: '2-digit',
                            minute: '2-digit'
                        })}</p>
                        {isLoggedIn && postData.username === username &&
                            <button className="mt-4 text-indigo-600 hover:text-indigo-400 transition duration-200" onClick={deleteBlog}>
                                Delete <MdDelete className="inline-block ml-1" />
                            </button>
                        }
                    </div>
                    {imageSrc && (
                        <div className="mb-4">
                            <img src={imageSrc} alt="Blog Image" className="w-full h-auto rounded-md" />
                        </div>
                    )}
                    <p className="text-base text-gray-800 leading-relaxed mb-8 whitespace-pre-wrap">{postBody}</p>
                </div>
            </div>
        </div>
    );
}

export default Post;

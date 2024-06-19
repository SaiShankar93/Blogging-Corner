import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import axios from 'axios';
import toast from 'react-hot-toast';

const ComposeBlog = () => {
    const navigate = useNavigate();
    const [postTitle, setPostTitle] = useState('');
    const [postBody, setPostBody] = useState('');
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const username = localStorage.getItem('username');
        const formData = new FormData();
        formData.append('postTitle', postTitle);
        formData.append('postBody', postBody);
        formData.append('userName', username);

        if (image) {
            const resizedImage = await resizeImage(image, 800, 600); // 4:3 aspect ratio
            formData.append('image', resizedImage);
        }

        try {
            const response = await axios.post(`${import.meta.env.VITE_PORT}/post/compose`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response.status === 201) {
                setPostTitle('');
                setPostBody('');
                setImage(null);
                toast.success("Blog created successfully");
                navigate('/');
            } else if (response.status === 400) {
                toast.error("The Blog Title Should be unique from other titles. Please choose another title for the blog.");
            } else {
                console.error('Failed to submit:', response.statusText);
            }
        } catch (error) {
            console.error('Error submitting:', error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleReset = () => {
        setPostTitle('');
        setPostBody('');
        setImage(null);
    };

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    const resizeImage = (file, width, height) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (event) => {
                const img = new Image();
                img.onload = () => {
                    const canvas = document.createElement('canvas');
                    const ctx = canvas.getContext('2d');
                    canvas.width = width;
                    canvas.height = height;
                    ctx.drawImage(img, 0, 0, width, height);
                    canvas.toBlob((blob) => {
                        resolve(new File([blob], file.name, {
                            type: file.type,
                            lastModified: Date.now(),
                        }));
                    }, file.type);
                };
                img.src = event.target.result;
            };
            reader.onerror = (error) => reject(error);
            reader.readAsDataURL(file);
        });
    };

    return (
        <div className="bg-gray-100 min-h-screen">
            <Navbar />
            <div className="container mx-auto py-10 px-4 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-semibold text-center text-gray-900 mb-8">Compose Your Blog</h1>
                <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6 sm:grid-cols-6">
                    <div className="sm:col-span-4">
                        <label htmlFor="postTitle" className="block text-sm font-medium text-gray-900">Give a Nice Title to Your Blog</label>
                        <input
                            type="text"
                            id="postTitle"
                            name="postTitle"
                            value={postTitle}
                            onChange={(e) => setPostTitle(e.target.value)}
                            autoComplete="off"
                            className="block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50 mt-1 px-3 py-2"
                        />
                    </div>
                    <div className="col-span-full">
                        <label htmlFor="postBody" className="block text-sm font-medium text-gray-900">Write the Blog Content</label>
                        <textarea
                            id="postBody"
                            name="postBody"
                            value={postBody}
                            onChange={(e) => setPostBody(e.target.value)}
                            rows="10"
                            className="block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50 mt-1 px-3 py-2"
                        ></textarea>
                    </div>
                    <div className="sm:col-span-4">
                        <label htmlFor="image" className="block text-sm font-medium text-gray-900">Upload an Image (optional)</label>
                        <input
                            type="file"
                            id="image"
                            name="image"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50 mt-1 px-3 py-2"
                        />
                    </div>
                    <div className="col-span-full flex justify-start">
                        <button type="button" onClick={handleReset} className="bg-gray-300 text-gray-800 py-2 px-4 rounded-md shadow-sm hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 mr-4">
                            Reset
                        </button>
                        <button type="submit" className="bg-indigo-600 text-white py-2 px-4 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-opacity-50">
                            {loading ? (
                                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                                </svg>
                            ) : (
                                'Submit'
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ComposeBlog;

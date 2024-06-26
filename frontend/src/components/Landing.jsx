import React from 'react';
import { Link } from 'react-router-dom'; // Assuming you're using React Router

const Landing = () => {
    return (
        <div className="bg-white">
            <header className="absolute inset-x-0 top-0 z-50 max">
                <nav className="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
                    <div className="flex lg:flex-1">
                        <Link to="/" className="-m-1.5 p-1.5">
                            <img className="h-14  w-auto rounded-full" src="/images/572-768x591.png" alt="" />
                        </Link>
                    </div>
                    <div className="hidden lg:flex lg:gap-x-12">
                        <Link to="/" className="text-md font-semibold leading-6 text-gray-900">Home</Link>
                        <Link to="/home" className="text-md font-semibold leading-6 text-gray-900">Read Blogs</Link>
                    </div>
                    <div className="lg:flex lg:flex-1 lg:justify-end">
                        <Link to="/signin" className="text-sm font-semibold leading-6 text-gray-900">Log in<span aria-hidden="true">&rarr;</span></Link>
                    </div>
                </nav>
            </header>

            <div className="relative isolate px-6 pt-14 lg:px-8">
                <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
                    <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#7B66FF] to-[#5FBDFF] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
                        style={{ clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)' }}>
                    </div>
                </div>
                <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
                    <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#7B66FF] to-[#5FBDFF] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
                        style={{ clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)' }}>
                    </div>
                </div>
                <div className="mx-auto max-w-2xl py-20 sm:py-48 lg:py-20">
                    <div className="text-center">
                        <h1 className="text-3xl pb-8 font-bold tracking-tight text-gray-900 sm:text-6xl"><i>THE BLOGGING CORNER</i></h1>
                        <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-6xl">Unleash the World of Insights</h1>
                        <p className="mt-6 text-md leading-8 text-gray-600">
                            Explore a World of Knowledge and Ideas with Our Diverse Community of Writers. Engage with
                            Stories, Insights, and Expertise on Every Conceivable Topics.</p>
                        <div className="mt-10 flex items-center justify-center gap-x-6">
                            <Link to="/home" className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Start Reading</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Landing;

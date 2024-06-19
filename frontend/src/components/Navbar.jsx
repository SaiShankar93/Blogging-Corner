import React from "react";
import logo from './images/572-768x591.png';
function Navbar() {
  const username = localStorage.getItem("username");
  const useremail = localStorage.getItem("useremail");
  const isLoggedIn = localStorage.getItem("isLoggedIn")
  let letter = ''
  if(username){
    letter = username[0];
  }
  const  handleLogout= () => {
    localStorage.removeItem('username'); 
    localStorage.removeItem('isLoggedIn'); 
    localStorage.removeItem('useremail'); 
    window.location.href = '/'
  };
    return (
        <nav className= "border-gray-300 bg-gray-900">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4"> 
          <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
            <img src={logo}className="h-12 rounded-full" alt="BC logo" />
            <span className="self-center text-2xl font-semibold whitespace-nowrap hidden md:block text-white">Blogging Corner</span>
          </a>
          <div>
            <ul className="flex flex-col font-medium p-0 md:p-0  border-0 rounded-lg  md:space-x-8 md:flex-row md:mt-0 md:border-0 white:bg-slate-300 md:white:bg-gray-900 ">
              <li>
                <a href="/" className=" py-2 px-3 h-8 text-white rounded md:bg-transparent md:p-0 hidden lg:block hover:text-gray-400" >Home</a>
              </li>
              <li>
                <a href="/compose" className="text-white block py-2 px-3  rounded md:bg-transparent md:p-0 hover:text-gray-400"><i className="fa-solid fa-pen-to-square pl-2"></i>  Write</a>
              </li>
              <li>
                <a href="/myBlogs" className="text-white hidden py-2 px-3 md:block  rounded md:bg-transparent md:p-0 hover:text-gray-500">My Blogs</a>
              </li>
            </ul>
          </div>
          {
            isLoggedIn ? (
              <div className="flex  items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
              <button type="button" className="text-lg text-center text-white rounded-full md:me-0 bg-gray-700 w-8 h-8 font-bold" id="user-menu-button" aria-expanded="false" data-dropdown-toggle="user-dropdown" data-dropdown-placement="bottom">
                {letter}
              </button>
              <div className="z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-900 dark:divide-gray-600" id="user-dropdown">
                <div className="px-4 py-4">
                  <span className="block text-sm  dark:text-white">{username}</span>
                  <span className="block text-sm  truncate dark:text-gray-300">{useremail}</span>
                </div>
                <ul className="py-2" aria-labelledby="user-menu-button">
                  <li>
                    <a href="/" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white md:hidden">Home</a>
                  </li>
                  <li>
                    <a href="/myBlogs" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white md:hidden">My Blogs</a>
                  </li>
                  <li>
                    <button onClick={handleLogout} className="w-full block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white" >Logout</button>
                  </li>
                </ul>
              </div>
            </div>
            ): (<button onClick={() => window.location.href = '/signin'} className="text-white bg-gray-700 rounded-md px-3 py-2">Login</button>)
          }


        </div>
      </nav>
    );
}

export default Navbar;

import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Landing from "./components/Landing";
import Signup from "./components/Signup";
import Signin from './components/Signin.jsx';
import Compose from './components/Compose';
import MyBlogs from './components/MyBlogs';
import Post from './components/Post';
import TempHome from './components/TempHome';


function App() {
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  return (  
    <Router>
      <Routes>
        <Route path="/" element={isLoggedIn == "true" ? <Home /> : <Landing />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<TempHome />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/compose" element={isLoggedIn ? <Compose /> : <Signin/>} />
        <Route path="/myBlogs" element={isLoggedIn?<MyBlogs />:<Signin/>} />
        <Route path="/post/posts/:postName" element={<Post />} />
      </Routes>
    </Router>
  );
}
export default App;
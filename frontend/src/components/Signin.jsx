import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { loginUser } from '../redux/Slice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './styles/style.css';
// import 'dotenv/config';

const schema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
});

function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm({ resolver: zodResolver(schema) });

    const onSubmit = async (data) => {
        try {
            const res = await fetch(`${import.meta.env.VITE_PORT}/user/signin`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });
            if (!res.ok) {
                throw new Error(`HTTP error! Status: ${res.status}`);
            }
            const resData = await res.json();
            const userData = resData.user;
            console.log(userData)
            dispatch(loginUser(userData));
            localStorage.setItem("isLoggedIn",true)
            localStorage.setItem("username",userData.username)
            localStorage.setItem("useremail",userData.email)
            document.cookie = `username=${userData.username}`
            window.location.href = "/";
        } catch (error) {
            console.log("Sign-in failed", error);
        }
    };

    return (
        <div className="bg">

        <div className='cont'>
            <h1 className='text-3xl font-bold'>Sign In</h1>
            <form onSubmit={handleSubmit(onSubmit)} name="form" method="post">
                <div className="input">
                    <input {...register("email")} id="email" type="text" placeholder="Enter Email" name="email" autoComplete="email" required />
                    {errors.email && <p className="error">{errors.email.message}</p>}
                    <input {...register("password")} id="password" type="password" placeholder="Enter Password" name="password" required />
                    {errors.password && <p className="error">{errors.password.message}</p>}
                </div>
                <div className="input" htmlFor="form">
                    <button disabled={isSubmitting} id="login-btn" type="submit" className="login-btn">Sign In</button>
                </div>
            </form>
            <a href="/signup" className="register">Not registered? Sign Up</a>
        </div>
        </div>
    );
}

export default Login;

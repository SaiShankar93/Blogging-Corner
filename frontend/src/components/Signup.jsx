import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useDispatch } from "react-redux";
import { signUpUser } from "../redux/Slice";
import { useNavigate } from "react-router-dom";
import "./styles/style.css";
// import 'dotenv/config';

const schema = z.object({
    username: z.string(),
    email: z.string().email(),
    mobile: z.string().min(10).max(10),
    password: z.string().min(8)
});

function SignUp() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting }
    } = useForm({ resolver: zodResolver(schema) });

    const onSubmit = async (data) => {
        console.log(data);
        try {
            const res = await fetch(`${import.meta.env.VITE_PORT}/user/signup`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });
            if (!res.ok) {
                throw new Error(`HTTP error! Status: ${res.status}`);
            }
            const userData = await res.json();
            console.log("jsd", userData.user);
            dispatch(signUpUser(userData.user));
            localStorage.setItem("isLoggedIn", true);
            localStorage.setItem("username", userData.user.username);
            localStorage.setItem("useremail", userData.user.email);
            document.cookie = `username=${userData.username}`;
            // localStorage.setItem("username")
            window.location.href = "/";
        } catch (error) {
            if (error.message.includes("duplicate key error")) {
                setError("User already exists. Please login instead.");
                console.log("Please login instead of signingup");
            } else {
                console.log("Signup failed", error);
            }
        }
    };

    return (
        <div className="bg">
            <div className="cont">
                <h1 className="text-3xl font-bold">Sign Up</h1>
                <form onSubmit={handleSubmit(onSubmit)} name="form" method="post">
                    <div className="input">
                        <input
                            {...register("username")}
                            id="username"
                            type="text"
                            placeholder="Enter Your name "
                            name="username"
                            autoComplete="name"
                            required
                            />
                        {errors.username && (
                            <p className="text-red-500 text-xs italic">
                                {errors.username.message}
                            </p>
                        )}
                        <input
                            {...register("email")}
                            id="email"
                            type="text"
                            placeholder="Enter Email id "
                            name="email"
                            autoComplete="email"
                            required
                            />
                        {errors.email && (
                            <p className="text-red-500 text-xs italic">
                                {errors.email.message}
                            </p>
                        )}
                        <input
                            {...register("mobile")}
                            id="mobile"
                            type="text"
                            placeholder="Enter mobile number"
                            name="mobile"
                            autoComplete="mobile"
                            required
                            />
                        {errors.mobile && (
                            <p className="text-red-500 text-xs italic">
                                {errors.mobile.message}
                            </p>
                        )}
                        <input
                            {...register("password")}
                            id="password"
                            type="password"
                            placeholder="Create Password"
                            name="password"
                            required
                            />
                        {errors.password && (
                            <p className="text-red-500 text-xs italic">
                                {errors.password.message}
                            </p>
                        )}
                    </div>
                    <div className="input">
                        <button
                            className="login-btn"
                            id="login-btn"
                            type="submit"
                            disabled={isSubmitting}
                            >
                            SignUp
                        </button>
                    </div>
                </form>
                {/* {error && <p className='error-message'>{error}</p>} */}
                <a href="/signin" className="register">
                    Already a User? Sign in
                </a>
            </div>
                            </div>
    );
}

export default SignUp;

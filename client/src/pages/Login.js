// src/pages/Auth.js
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	loginUserAsync,
	registerUserAsync,
} from "../features/auth/authAction";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "../styles/Login.module.css";

const Auth = () => {
	const [isLogin, setIsLogin] = useState(true);
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { loading, error } = useSelector((state) => state.auth);

	const handleToggle = () => {
		console.log("Toggling isLogin:", isLogin);
		setIsLogin(!isLogin);
	};

	const handleLogin = async (e) => {
		e.preventDefault();
		try {
			const result = await dispatch(loginUserAsync({ email, password })).unwrap();
			if (result) {
				// Show success toast
				toast.success(`Welcome back!`);
				setTimeout(() => navigate("/"), 2500);
			}
		} catch (err) {
			console.error("Login failed:", err);
			toast.error("Login failed. Please try again.");
		}
	};

	const handleRegister = async (e) => {
		e.preventDefault();
		try {
			await dispatch(registerUserAsync({ username, email, password })).unwrap();

			// Show success toast
			toast.success(`Welcome to the platform!`);
			setTimeout(() => navigate("/"), 2500);
		} catch (err) {
			console.error("Registration failed:", err);
			toast.error("Registration failed. Please try again.");
		}
	};

	return (
		<div className={styles.authContainer}>
			<div className={styles.authCard}>
				<h1>{isLogin ? "Login" : "Register"}</h1>
				<form
					className={`${styles.authForm} ${
						isLogin ? styles.slideIn : styles.slideOut
					}`}
					onSubmit={isLogin ? handleLogin : handleRegister}>
					{!isLogin && (
						<input
							type="text"
							value={username}
							onChange={(e) => setUsername(e.target.value)}
							placeholder="Username"
							required
							className={styles.inputField}
						/>
					)}
					<input
						type="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						placeholder="Email"
						required
						className={styles.inputField}
					/>
					<input
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						placeholder="Password"
						required
						className={styles.inputField}
					/>
					<button
						type="submit"
						disabled={loading}
						className={styles.submitBtn}>
						{loading ? "Processing..." : isLogin ? "Login" : "Register"}
					</button>
					{error && <p className={styles.error}>{error}</p>}
				</form>
                
				<button
					onClick={handleToggle}
					className={styles.toggleButton}>
					{isLogin
						? "Don't have an account? Register"
						: "Already have an account? Login"}
				</button>
			</div>

			{/* Toast Container for Notifications */}
			<ToastContainer
				position="top-right"
				autoClose={3000}
			/>
		</div>
	);
};

export default Auth;

// /src/pages/Register.js
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { registerUserAsync } from "../features/auth/authAction";
import { useNavigate } from "react-router-dom";
import Modal from "../components/Modal";
import styles from "../styles/Register.module.css";

const Register = () => {
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState(null);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleRegister = async (e) => {
		// Prevent the default form submission behavior
		e.preventDefault();

		try {
			// Dispatch the async action with an object containing username, email, and password
			const result = await dispatch(
				registerUserAsync({ username, email, password })
			);

			// Check if registration was successful
			if (result.payload && result.payload.token) {
				navigate("/profile");
			} else {
				// Handle case where there is no token in the response (failed registration)
				setError(result.error ? result.error.message : "Registration failed");
			}
		} catch (error) {
			console.error(error);
			setError(error.message || "An error occurred during registration.");
		}
	};

	const closeModal = () => {
		setError(null);
	};

	return (
		<div className={styles.container}>
			<h1 className={styles.heading}>Register</h1>
			{error && (
				<Modal
					message={error}
					onClose={closeModal}
					type="error"
				/>
			)}
			<form onSubmit={handleRegister}>
				<input
					type="text"
					className={styles.inputField}
					placeholder="Username"
					value={username}
					onChange={(e) => setUsername(e.target.value)}
				/>
				<input
					type="email"
					className={styles.inputField}
					placeholder="Email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>
				<input
					type="password"
					className={styles.inputField}
					placeholder="Password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
				<button
					type="submit"
					className={styles.button}>
					Register
				</button>
			</form>
		</div>
	);
};

export default Register;

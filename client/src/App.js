// /src/App.js
import React, { useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { useDispatch } from "react-redux";
import Navbar from "./components/NavBar";
import Footer from "./components/Footer";
import RouterComponent from "./routes/Router";
import styles from "./styles/App.module.css";
import { setUser } from "./features/auth/authSlice";

const App = () => {
	const dispatch = useDispatch();

	// Helper function to manually decode the JWT
	const decodeToken = (token) => {
		try {
			// Extract payload from token (part 2 of the JWT)
			const base64Url = token.split(".")[1];
			const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
			const jsonPayload = decodeURIComponent(
				atob(base64)
					.split("")
					.map((c) => `%${("00" + c.charCodeAt(0).toString(16)).slice(-2)}`)
					.join("")
			);
			return JSON.parse(jsonPayload);
		} catch (error) {
			console.error("Invalid token:", error);
			return null;
		}
	};

	useEffect(() => {
		// Retrieve token from localStorage
		const token = localStorage.getItem("token");
		if (token) {
			const decoded = decodeToken(token);
			const currentTime = Math.floor(Date.now() / 1000);

			// Validate token expiration
			if (decoded && decoded.exp > currentTime) {
				dispatch(setUser({ user: { id: decoded.user_id }, token }));
			} else {
				console.warn("Token has expired or is invalid.");
				localStorage.removeItem("token");
			}
		}
	}, [dispatch]);

	return (
		<Router>
			<Navbar />
			<div className={styles.content}>
				<RouterComponent />
			</div>
			<Footer />
		</Router>
	);
};

export default App;

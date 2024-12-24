// /src/api/authAPI.js
import { postRequest } from "./FetchUtils";

// Generic POST request handler for authentication (login, register, logout)
const postAuthRequest = async (endpoint, body) => {
	try {
		const { data, status, error } = await postRequest(endpoint, body);
		console.log("Response from backend:", { data, status, error });

		// If the status is 200 or 201 (success), store the token in localStorage
		if (status === 200 || status === 201) {
			if (data.token) {
				// Save the token to localStorage
				localStorage.setItem("token", data.token);
			}
			return { data }; // Return response data (user and token)
		} else {
			throw new Error(error || "Request failed");
		}
	} catch (error) {
		console.error(`${endpoint} failed:`, error);
		return { error: error.message };
	}
};

// Login function using postAuthRequest to handle token storage
export const loginUser = async (email, password) => {
	// Reusing postAuthRequest to handle login
	const response = await postAuthRequest("/login", { email, password });

	// Check if login was successful
	if (response.data && response.data.token) {
		console.log("Login successful, token stored:", response.data.token);
        console.log("Token received from backend:", response.data.token);
		localStorage.setItem("token", response.data.token);
		return response.data.token;
	} else {
		throw new Error("Failed to log in");
	}
};

// Register function, also uses postAuthRequest
export const registerUser = async (username, email, password) => {
	return postAuthRequest("/register", { username, email, password });
};

// Logout function, calls postAuthRequest for logout
export const logoutUser = async () => {
	const response = await postAuthRequest("/logout", {});
	if (response.data) {
		localStorage.removeItem("token");
		return response.data;
	} else {
		throw new Error("Failed to log out");
	}
};

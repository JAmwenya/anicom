// /src/utils/helpers.js

// Helper function for creating a standardized response
export const createResponse = (data = null, message = "", status = 200) => {
	return { data, message, status };
};

// Format date to a readable string (example: 'April 5, 2024')
export const formatDate = (dateString) => {
	const options = { year: "numeric", month: "long", day: "numeric" };
	const date = new Date(dateString);
	return date.toLocaleDateString(undefined, options);
};

// Helper function to check if the user is logged in
export const isLoggedIn = (token) => {
	return token !== null && token !== undefined;
};

// Helper function to set the token in local storage
export const setToken = (token) => {
	if (typeof token === "object") {
		console.error(
			"Invalid token format, expected string but got object:",
			token
		);
	}
	localStorage.setItem("token", token);
};

// Helper function to get the token from local storage
export const getToken = () => {
    return localStorage.getItem("token");
};

// Helper function to remove the token from local storage
export const removeToken = () => {
    localStorage.removeItem("token");
};
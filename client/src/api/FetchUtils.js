// /src/api/FetchUtils.js

const BASE_URL = process.env.REACT_APP_API_URL || "http://127.0.0.1:5000";

// Utility function to get the token from localStorage
export function getToken() {
	try {
		const token = localStorage.getItem("token");
		if (!token) {
			console.warn("No token found in localStorage.");
		}
		console.log("Retrieved token from localStorage:", token);
		return token;
	} catch (error) {
		console.error("Error retrieving token:", error.message);
		return null;
	}
}

// Utility function to handle response and errors
async function handleResponse(response) {
    console.log("Handling response with status:", response.status);
    try {
        if (response.status === 403) {
            console.error("Access forbidden: You may not be authenticated.");
            throw new Error("Access forbidden");
        }
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "An error occurred");
        }
        const jsonResponse = await response.json();
        console.log("Response JSON data:", jsonResponse);
        return { data: jsonResponse, status: response.status, error: null }; // Return status and error properly
    } catch (error) {
        console.error("Error handling response:", error.message);
        return { data: null, status: response.status, error: error.message }; // Return error if something goes wrong
    }
}


// Utility function to handle GET requests
export async function getRequest(endpoint) {
	const token = getToken();
	console.log("Fetching GET request to:", `${BASE_URL}${endpoint}`);

	try {
		const response = await fetch(`${BASE_URL}${endpoint}`, {
			method: "GET",
			mode: "cors",
			headers: {
				"Content-Type": "application/json",
				Authorization: token ? `Bearer ${token}` : "",
			},
		});
		return await handleResponse(response);
	} catch (error) {
		console.error("GET request error:", error.message);
		throw error;
	}
}

// Utility function to handle POST requests
export async function postRequest(endpoint, data) {
	const token = getToken();
	console.log("Fetching POST request to:", `${BASE_URL}${endpoint}`);
	console.log("Token:", token);
	console.log("POST request data:", data);

	try {
		const response = await fetch(`${BASE_URL}${endpoint}`, {
			method: "POST",
			mode: "cors",
			headers: {
				"Content-Type": "application/json",
				Authorization: token ? `Bearer ${token}` : "",
			},
			body: JSON.stringify(data),
		});
		return await handleResponse(response);
	} catch (error) {
		console.error("POST request error:", error.message);
		throw error;
	}
}

// Utility function to handle PUT requests
export async function putRequest(endpoint, data) {
	const token = getToken();
	console.log("Fetching PUT request to:", `${BASE_URL}${endpoint}`);
	console.log("Token:", token);
	console.log("PUT request data:", data);

	try {
		const response = await fetch(`${BASE_URL}${endpoint}`, {
			method: "PUT",
			mode: "cors",
			headers: {
				"Content-Type": "application/json",
				Authorization: token ? `Bearer ${token}` : "",
			},
			body: JSON.stringify(data),
		});
		return await handleResponse(response);
	} catch (error) {
		console.error("PUT request error:", error.message);
		throw error;
	}
}

// Utility function to handle PATCH requests
export async function patchRequest(endpoint, data) {
	const token = getToken();
    console.log("Fetching PATCH request to:", `${BASE_URL}${endpoint}`);
		console.log("Token:", token);
		console.log("PATCH request data:", JSON.stringify(data));

	try {
		const response = await fetch(`${BASE_URL}${endpoint}`, {
			method: "PATCH",
			mode: "cors",
			headers: {
				"Content-Type": "application/json",
				Authorization: token ? `Bearer ${token}` : "",
			},
			body: JSON.stringify(data),
		});
		return await handleResponse(response);
	} catch (error) {
		console.error("PATCH request error:", error.message);
		throw error;
	}
}

// Utility function to handle DELETE requests
export async function deleteRequest(endpoint) {
	const token = getToken();
	console.log("Fetching DELETE request to:", `${BASE_URL}${endpoint}`);
	console.log("Token:", token);

	try {
		const response = await fetch(`${BASE_URL}${endpoint}`, {
			method: "DELETE",
			mode: "cors",
			headers: {
				Authorization: token ? `Bearer ${token}` : "",
			},
		});
		return await handleResponse(response);
	} catch (error) {
		console.error("DELETE request error:", error.message);
		throw error;
	}
}

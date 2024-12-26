// /src/api/authAPI.js
import {postRequest} from "./FetchUtils";

// Login user
export const loginUser = async (credentials) => {
  try {
    const response = await postRequest("/login", credentials);

    // Check if the response is successful and contains a token
    if (response && response.status === 200 && response.data && response.data.token) {
      console.log("Received token from backend:", response.data.token);
      localStorage.setItem("token", response.data.token);
      return response.data.token;
    } else {
      // If the token is missing or response status is not 200
      console.error("Login failed, missing token or invalid status", response);
      throw new Error("Failed to log in, no token received.");
    }
  } catch (error) {
    // Catch any errors during the request
    console.error("Login error:", error.message);
    throw new Error("Failed to log in due to network or server issue.");
  }
};

// Register user
export const registerUser = async (userData) => {
  try {
    console.log("Registering user with data:", userData);

    const response = await postRequest("/register", {
      username: userData.username,
      email: userData.email,
      password: userData.password,
    });

    // Check if the response is successful
    if (response && response.status === 201) {
      console.log("User registration successful:", response.data);
      return response.data; // Return the response data for further use
    } else {
      // If the response status is not 200, log and throw an error
      console.error("Registration failed, invalid status or missing data", response);
      throw new Error(response.data?.message || "Failed to register the user.");
    }
  } catch (error) {
    // Catch any errors during the request
    console.error("Registration error:", error.message);
    throw new Error("Failed to register due to network or server issue.");
  }
};


// Logout user
export const logoutUser = () => {
	localStorage.removeItem("token");
	console.log("Token removed from localStorage");
};

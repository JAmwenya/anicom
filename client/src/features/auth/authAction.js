// /src/features/auth/authAction.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import { loginUser, registerUser, logoutUser } from "../../api/authAPI";
import { setToken } from "../../utils/helpers";

// Utility function to handle API responses and errors
const handleResponse = (response, actionType) => {
	if (response.error) {
		throw new Error(response.error);
	}
	if (actionType === "auth/logoutUser") {
		return {};
	}
	return { user: response.user, token: response.token };
};

// Reusable async thunk creator for login, register, and logout actions
const createAuthThunk = (actionType, authFunction) => {
	return createAsyncThunk(actionType, async (credentials) => {
		const response = await authFunction(credentials);
		return handleResponse(response, actionType);
	});
};

// Async thunk for logging in the user
export const loginUserAsync = createAsyncThunk(
	"auth/userLogin",
	async (credentials, { rejectWithValue }) => {
		try {
			const token = await loginUser(credentials);
			if (!token) throw new Error("Failed to retrieve token");

			setToken(token);
			localStorage.setItem(
				"user",
				JSON.stringify({ email: credentials.email })
			);
			return { user: { email: credentials.email }, token };
		} catch (error) {
			console.error("Login error:", error);
			return rejectWithValue(error.response?.data?.message || error.message);
		}
	}
);

// Async thunk for registering the user
export const registerUserAsync = createAuthThunk(
	"auth/registerUser",
	(userData) => registerUser(userData)
);


// Async thunk for logging out the user (no need for credentials)
export const logoutUserAsync = createAsyncThunk("auth/logoutUser", async () => {
	const response = await logoutUser();
	return handleResponse(response, "auth/logoutUser");
});

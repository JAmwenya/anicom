// /src/features/user/userAction.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
	fetchUserProfile,
	fetchUserById,
	fetchAllUsers,
	updateUserProfile,
	patchUserProfile,
	updateUserAvatar,
	deleteUser,
} from "../../api/userAPI";

// Helper function to handle API response and errors
const handleApiResponse = (response, actionName) => {
	if (response.error) {
		console.error(`${actionName} failed:`, response.error);
		throw new Error(response.error);
	}
	return (
		response.profile || response.user || response.users || response.message
	);
};

// Async thunk to fetch the current user's profile
export const fetchUserProfileAsync = createAsyncThunk(
	"user/fetchUserProfile",
	async (token, { rejectWithValue }) => {
		try {
			const response = await fetchUserProfile(token);
			// Assuming handleApiResponse checks the response for profile, user or error
			return handleApiResponse(response, "Fetch User Profile");
		} catch (error) {
			console.error("Error in fetchUserProfileAsync:", error.message);
			// Passing the error message to rejectWithValue to handle in reducers
			return rejectWithValue(error.message || "An unknown error occurred");
		}
	}
);


// Async thunk to fetch a user by ID
export const fetchUserByIdAsync = createAsyncThunk(
	"user/fetchUserById",
	async ({ userId, token }, { rejectWithValue }) => {
		try {
			const response = await fetchUserById(userId, token);
			return handleApiResponse(response, "Fetch User by ID");
		} catch (error) {
			console.error("Error in fetchUserByIdAsync:", error.message);
			return rejectWithValue(error.message);
		}
	}
);

// Async thunk to fetch all users
export const fetchAllUsersAsync = createAsyncThunk(
	"user/fetchAllUsers",
	async (token, { rejectWithValue }) => {
		try {
			const response = await fetchAllUsers(token);
			return handleApiResponse(response, "Fetch All Users");
		} catch (error) {
			console.error("Error in fetchAllUsersAsync:", error.message);
			return rejectWithValue(error.message);
		}
	}
);

// Async thunk to update the user profile
export const updateUserProfileAsync = createAsyncThunk(
	"user/updateUserProfile",
	async ({ userId, userData, token }, { rejectWithValue }) => {
		try {
			const response = await updateUserProfile(userId, userData, token);
			return handleApiResponse(response, "Update User Profile");
		} catch (error) {
			console.error("Error in updateUserProfileAsync:", error.message);
			return rejectWithValue(error.message);
		}
	}
);

// Async thunk to patch the user profile
export const patchUserProfileAsync = createAsyncThunk(
	"user/patchUserProfile",
	async ({ userId, patchData, token }, { rejectWithValue }) => {
		try {
			const response = await patchUserProfile(userId, patchData, token);
			return handleApiResponse(response, "Patch User Profile");
		} catch (error) {
			console.error("Error in patchUserProfileAsync:", error.message);
			return rejectWithValue(error.message);
		}
	}
);

// Async thunk to update the user avatar
export const updateUserAvatarAsync = createAsyncThunk(
	"user/updateUserAvatar",
	async ({ userId, avatarUrl, token }, { rejectWithValue }) => {
		try {
			const response = await updateUserAvatar(userId, avatarUrl, token);
			return handleApiResponse(response, "Update User Avatar");
		} catch (error) {
			console.error("Error in updateUserAvatarAsync:", error.message);
			return rejectWithValue(error.message);
		}
	}
);

// Async thunk to delete a user
export const deleteUserAsync = createAsyncThunk(
	"user/deleteUser",
	async ({ userId, token }, { rejectWithValue }) => {
		try {
			const response = await deleteUser(userId, token);
			return handleApiResponse(response, "Delete User");
		} catch (error) {
			console.error("Error in deleteUserAsync:", error.message);
			return rejectWithValue(error.message);
		}
	}
);

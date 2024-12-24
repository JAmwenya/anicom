// /src/features/user/userAction.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchUserProfile, updateUserProfile } from "../../api/userAPI";

// Helper function to handle API response and errors
const handleApiResponse = (response) => {
	if (response.error) {
		throw new Error(response.error);
	}
	return response.profile || response.user; // Return profile or user based on the action
};

// Async thunk to fetch the user profile
export const fetchUserProfileAsync = createAsyncThunk(
	"user/fetchUserProfile",
	async (token) => {
		const response = await fetchUserProfile(token);
		return handleApiResponse(response); // Use helper function for handling response
	}
);

// Async thunk to update the user profile
export const updateUserProfileAsync = createAsyncThunk(
	"user/updateUserProfile",
	async ({ userId, userData, token }) => {
		const response = await updateUserProfile(userId, userData, token);
		return handleApiResponse(response); // Use helper function for handling response
	}
);

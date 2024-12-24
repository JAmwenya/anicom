// /src/api/userAPI.js
import { getRequest, putRequest } from "./FetchUtils";

const API_URL = "/user";

// Fetch user profile
export const fetchUserProfile = async (token) => {
	try {
		const { data, status, error } = await getRequest(
			`${API_URL}/profile`,
			token
		);
		console.log("Response for user profile fetch:", { data, status, error });

		// Ensure status is 200 and data exists
		if (status === 200) {
			return { profile: data };
		} else {
			throw new Error(error || "Failed to fetch user profile");
		}
	} catch (error) {
		console.error("Error fetching user profile:", error);
		return { error: error.message };
	}
};

// Update user profile
export const updateUserProfile = async (userId, userData, token) => {
	try {
		const { data, status, error } = await putRequest(
			`${API_URL}/${userId}`,
			userData,
			token
		);
		console.log("Response for user profile update:", { data, status, error });

		// Ensure status is 200 and data exists
		if (status === 200) {
			return { user: data };
		} else {
			throw new Error(error || "Failed to update user profile");
		}
	} catch (error) {
		console.error("Error updating user profile:", error);
		return { error: error.message };
	}
};

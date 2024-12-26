// /src/api/userAPI.js
import {
	getRequest,
	putRequest,
	patchRequest,
	deleteRequest,
} from "./FetchUtils";

const API_URL = "/user";

// Fetch user profile
export const fetchUserProfile = async (token) => {
	try {
		const { data, status, error } = await getRequest(
			`${API_URL}/profile`,
			token
		);
		console.log("Response for user profile fetch:", { data, status, error });

		if (status === 200) {
			return { profile: data };
		} else {
			// If error is not in the response, use a generic message
			throw new Error(error || "Failed to fetch user profile");
		}
	} catch (error) {
		console.error("Error fetching user profile:", error);
		return { error: error.message || "An unknown error occurred" };
	}
};

// Fetch user by ID
export const fetchUserById = async (userId, token) => {
	try {
		const { data, status, error } = await getRequest(
			`${API_URL}/${userId}`,
			token
		);
		console.log("Response for fetching user by ID:", { data, status, error });

		if (status === 200) {
			return { user: data };
		} else {
			throw new Error(error || "Failed to fetch user");
		}
	} catch (error) {
		console.error("Error fetching user by ID:", error);
		return { error: error.message };
	}
};

// Fetch all users
export const fetchAllUsers = async (token) => {
	try {
		const { data, status, error } = await getRequest(`${API_URL}s`, token); // Assuming "/users" for all users
		console.log("Response for fetching all users:", { data, status, error });

		if (status === 200) {
			return { users: data };
		} else {
			throw new Error(error || "Failed to fetch users");
		}
	} catch (error) {
		console.error("Error fetching all users:", error);
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

// Patch user profile
export const patchUserProfile = async (userId, patchData, token) => {
	try {
		const { data, status, error } = await patchRequest(
			`${API_URL}/${userId}`,
			patchData,
			token
		);
		console.log("Response for patching user profile:", { data, status, error });

		if (status === 200) {
			return { user: data };
		} else {
			throw new Error(error || "Failed to patch user profile");
		}
	} catch (error) {
		console.error("Error patching user profile:", error);
		return { error: error.message };
	}
};

// Update user avatar
export const updateUserAvatar = async (userId, avatarUrl, token) => {
	try {
		const { data, status, error } = await patchRequest(
			`${API_URL}/${userId}/avatar`,
			{ avatar: avatarUrl },
			token
		);
		console.log("Response for updating user avatar:", { data, status, error });

		if (status === 200) {
			return { user: data };
		} else {
			throw new Error(error || "Failed to update user avatar");
		}
	} catch (error) {
		console.error("Error updating user avatar:", error);
		return { error: error.message };
	}
};

// Delete user
export const deleteUser = async (userId, token) => {
	try {
		const { data, status, error } = await deleteRequest(
			`${API_URL}/${userId}`,
			token
		);
		console.log("Response for deleting user:", { data, status, error });

		if (status === 200) {
			return { message: "User deleted successfully" };
		} else {
			throw new Error(error || "Failed to delete user");
		}
	} catch (error) {
		console.error("Error deleting user:", error);
		return { error: error.message };
	}
};

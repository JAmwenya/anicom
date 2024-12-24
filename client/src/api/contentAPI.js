// /src/api/contentAPI.js
import {
	postRequest,
	getRequest,
	patchRequest,
	putRequest,
	deleteRequest,
} from "./FetchUtils";

const API_URL = "/content";

// Fetch all content (e.g., reviews, fan art, etc.)
export const fetchAllContent = async () => {
	try {
		const { data, status, error } = await getRequest(
			`${API_URL}`
		);

		if (status === 200) {
			return {
				contentList: data.data || [],
				totalContent: data.data.length || 0,
			};
		} else {
			throw new Error(error || "Failed to fetch content");
		}
	} catch (error) {
		console.error("Error fetching all content:", error);
		return { error: error.message };
	}
};

// Fetch content by ID
export const fetchContentById = async (contentId) => {
	try {
		const { data, status, error } = await getRequest(`${API_URL}/${contentId}`);
		console.log("Response for fetching content by ID:", {
			data,
			status,
			error,
		});

		// Check if the status is 200 (success) and if data exists
		if (status === 200 && data) {
			return { content: data };
		} else {
			throw new Error(error || "Failed to fetch content");
		}
	} catch (error) {
		console.error("Error fetching content by ID:", error);
		return { error: error.message };
	}
};

// Submit user content (review, fan art, etc.)
export const submitContent = async (animeId, contentType, content) => {
	try {
		const { data, status, error } = await postRequest(`${API_URL}`, {
			animeId,
			contentType,
			title: content.title,
			body: content.body,
		});
		console.log("Response for content submission:", { data, status, error });

		// Check if the status is 201 (success) and return the created content
		if (status === 201) {
			return { content: data };
		} else {
			throw new Error(error || "Failed to submit content");
		}
	} catch (error) {
		console.error("Error submitting content:", error);
		return { error: error.message };
	}
};

// Update existing content (PUT)
export const updateContent = async (contentId, contentType, content) => {
	try {
		const { data, status, error } = await putRequest(
			`${API_URL}/${contentId}`,
			{
				contentType,
				title: content.title,
				body: content.body,
			}
		);
		console.log("Response for content update:", { data, status, error });

		// Check if the status is 200 (success) and return the updated content
		if (status === 200) {
			return { content: data };
		} else {
			throw new Error(error || "Failed to update content");
		}
	} catch (error) {
		console.error("Error updating content:", error);
		return { error: error.message };
	}
};

// Partially update existing content (PATCH)
export const patchContent = async (contentId, contentType, content) => {
	try {
		const { data, status, error } = await patchRequest(
			`${API_URL}/${contentId}`,
			{
				contentType,
				title: content.title,
				body: content.body,
			}
		);
		console.log("Response for content patch:", { data, status, error });

		// Check if the status is 200 (success) and return the updated content
		if (status === 200) {
			return { content: data };
		} else {
			throw new Error(error || "Failed to patch content");
		}
	} catch (error) {
		console.error("Error patching content:", error);
		return { error: error.message };
	}
};

// Delete content by ID
export const deleteContent = async (contentId) => {
	try {
		const { data, status, error } = await deleteRequest(
			`${API_URL}/${contentId}`
		);
		console.log("Response for content deletion:", { data, status, error });

		// Check if the status is 200 (success)
		if (status === 200) {
			return { content: data };
		} else {
			throw new Error(error || "Failed to delete content");
		}
	} catch (error) {
		console.error("Error deleting content:", error);
		return { error: error.message };
	}
};

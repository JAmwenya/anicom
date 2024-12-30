// /src/api/contentAPI.js
import {
	postRequest,
	getRequest,
	patchRequest,
	putRequest,
	deleteRequest,
	getToken,
} from "./FetchUtils";

const API_URL = "/content";

// Fetch all content (e.g., reviews, fan art, etc.)
export const fetchAllContent = async () => {
	try {
		const { data, status, error } = await getRequest(`${API_URL}`);

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

// Submit user content (review, fan art, etc.) - Requires Authorization
export const submitContent = async (animeId, contentType, title, body) => {
	console.log("API call parameters:", { animeId, contentType, title, body }); // Debug log

	if (!animeId || !contentType || !title || !body) {
		throw new Error("Invalid API call parameters");
	}

	const { data, status, error } = await postRequest(`${API_URL}`, {
		animeId,
		contentType,
		title,
		body,
	});

	if (status === 201) {
		return { content: data };
	} else {
		throw new Error(error || "Failed to submit content");
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

// Partially update existing content (PATCH) - Requires Authorization
export const patchContent = async (contentId, contentType, content) => {
	try {
		const token = getToken();
		if (!token) throw new Error("Unauthorized: Missing token");

		const { data, status, error } = await patchRequest(
			`${API_URL}/${contentId}`,
			{
				contentType,
				title: content.title,
				body: content.body,
			},
			token // Pass token for authorization
		);
		console.log("Response for content patch:", { data, status, error });

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

// Delete content by ID - Requires Authorization
export const deleteContent = async (contentId) => {
	try {
		const token = getToken();
		if (!token) throw new Error("Unauthorized: Missing token");

		const { data, status, error } = await deleteRequest(
			`${API_URL}/${contentId}`,
			token
		);
		console.log("Response for content deletion:", { data, status, error });

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

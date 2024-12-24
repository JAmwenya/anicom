// /src/api/episodeAPI.js
import {
	getRequest,
	postRequest,
	putRequest,
	patchRequest,
	deleteRequest,
} from "./FetchUtils";

const API_URL = "/episode";

// Fetch all episodes (GET /episode)
export const fetchEpisodes = async () => {
	try {
		const { data, status, error } = await getRequest(`${API_URL}`);
		console.log("Fetched episodes:", data); // Log the entire response for debugging

		if (status === 200 && data && data.data) {
			return {
				episodeList: data.data || [], // Fix: Access the `data` inside the response
				totalEpisodes: data.data.length || 0, // Fix: Correct total count
			};
		} else {
			throw new Error(error || "Failed to fetch episodes");
		}
	} catch (error) {
		console.error("Error fetching episodes:", error);
		return { error: error.message };
	}
};

// Fetch details of a specific episode (GET /episode/<episodeId>)
export const fetchEpisodeById = async (episodeId) => {
	try {
		const { data, status, error } = await getRequest(`${API_URL}/${episodeId}`);
		console.log("Response for episode details fetch:", { data, status, error });

		if (status === 200 && data) {
			return { episode: data }; // Return the specific episode data
		} else {
			throw new Error(error || "Failed to fetch episode details");
		}
	} catch (error) {
		console.error("Error fetching episode details:", error);
		return { error: error.message };
	}
};

// Add a new episode (POST /episode)
export const addEpisode = async (episodeData) => {
	try {
		const { data, status, error } = await postRequest(
			`${API_URL}`,
			episodeData
		);
		console.log("Response for adding episode:", { data, status, error });

		if (status === 201 && data) {
			return { episode: data }; // Return the added episode
		} else {
			throw new Error(error || "Failed to add episode");
		}
	} catch (error) {
		console.error("Error adding episode:", error);
		return { error: error.message };
	}
};

// Update an existing episode (PUT /episode/<episodeId>)
export const updateEpisode = async (episodeId, episodeData) => {
	try {
		const { data, status, error } = await putRequest(
			`${API_URL}/${episodeId}`,
			episodeData
		);
		console.log("Response for episode update:", { data, status, error });

		if (status === 200 && data) {
			return { episode: data }; // Return the updated episode
		} else {
			throw new Error(error || "Failed to update episode");
		}
	} catch (error) {
		console.error("Error updating episode:", error);
		return { error: error.message };
	}
};

// Partially update an episode (PATCH /episode/<episodeId>)
export const patchEpisode = async (episodeId, episodeData) => {
	try {
		const { data, status, error } = await patchRequest(
			`${API_URL}/${episodeId}`,
			episodeData
		);
		console.log("Response for episode patch:", { data, status, error });

		if (status === 200 && data) {
			return { episode: data }; // Return the patched episode
		} else {
			throw new Error(error || "Failed to patch episode");
		}
	} catch (error) {
		console.error("Error patching episode:", error);
		return { error: error.message };
	}
};

// Delete an episode (DELETE /episode/<episodeId>)
export const deleteEpisode = async (episodeId) => {
	try {
		const { data, status, error } = await deleteRequest(
			`${API_URL}/${episodeId}`
		);
		console.log("Response for episode deletion:", { data, status, error });

		if (status === 200 && data) {
			return { episode: data }; // Return the deleted episode data
		} else {
			throw new Error(error || "Failed to delete episode");
		}
	} catch (error) {
		console.error("Error deleting episode:", error);
		return { error: error.message };
	}
};

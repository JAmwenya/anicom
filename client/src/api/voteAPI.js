// /src/api/voteAPI.js
import { postRequest, getRequest, patchRequest, deleteRequest } from "./FetchUtils";

const API_URL = "/vote";

// Submit a vote
export const submitVote = async (userId, episodeId, rating, animeId) => {
	try {
		// Construct payload
		const payload = {
			user_id: userId,
			episode_id: episodeId,
			vote_value: rating,
			anime_id: animeId,
		};

		console.log("Sending payload to backend:", payload);

		const { data, status, error } = await postRequest(`${API_URL}`, payload);

		console.log("Response from backend:", { data, status, error });

		if (status === 201) {
			return { votes: data };
		} else {
			throw new Error(error || "Failed to submit vote");
		}
	} catch (error) {
		console.error("Error in submitVote:", error);
		return { error: error.message };
	}
};

// Fetch all votes
export const fetchVotes = async () => {
    try {
        const { data, status, error } = await getRequest(`${API_URL}`);

        console.log("Response for fetching votes:", { data, status, error });

        if (status === 200) {
            return { votes: data };
        } else {
            throw new Error(error || "Failed to fetch votes");
        }
    } catch (error) {
        console.error("Error fetching votes:", error);
        return { error: error.message };
    }
};

// Fetch a vote by ID
export const fetchVoteById = async (voteId) => {
    try {
        const { data, status, error } = await getRequest(`${API_URL}/${voteId}`);

        console.log("Response for fetching vote by ID:", { data, status, error });

        if (status === 200) {
            return { vote: data };
        } else {
            throw new Error(error || "Failed to fetch vote");
        }
    } catch (error) {
        console.error("Error fetching vote by ID:", error);
        return { error: error.message };
    }
};

// Update a vote
export const updateVote = async (voteId, rating) => {
    try {
        const { data, status, error } = await patchRequest(`${API_URL}/${voteId}`, {
            vote_value: rating,
        });

        console.log("Response for updating vote:", { data, status, error });

        if (status === 200) {
            return { votes: data };
        } else {
            throw new Error(error || "Failed to update vote");
        }
    } catch (error) {
        console.error("Error updating vote:", error);
        return { error: error.message };
    }
};

// Delete a vote
export const deleteVote = async (voteId) => {
    try {
        const { data, status, error } = await deleteRequest(`${API_URL}/${voteId}`);

        console.log("Response for deleting vote:", { data, status, error });

        if (status === 200) {
            return { votes: data };
        } else {
            throw new Error(error || "Failed to delete vote");
        }
    } catch (error) {
        console.error("Error deleting vote:", error);
        return { error: error.message };
    }
};

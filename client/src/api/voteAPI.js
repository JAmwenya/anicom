// /src/api/voteAPI.js
import { postRequest } from "./FetchUtils";

const API_URL = "/vote";

// Submit a vote
export const submitVote = async (episodeId, rating) => {
	try {
		const { data, status, error } = await postRequest(`${API_URL}`, {
			episodeId,
			rating,
		});

		console.log("Response for submitting vote:", { data, status, error }); 
        
		// Check if status is 200 and the data contains votes
		if (status === 200) {
			return { votes: data.votes };
		} else {
			throw new Error(error || "Failed to submit vote");
		}
	} catch (error) {
		console.error("Error submitting vote:", error);
		return { error: error.message };
	}
};

// /src/features/vote/voteAction.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import { submitVote } from "../../api/voteAPI";

// Helper function to handle response and errors
const handleApiResponse = (response) => {
	if (response.error) {
		throw new Error(response.error);
	}
	return response.votes; // Return the votes data
};

// Async thunk for submitting a vote
export const submitVoteAsync = createAsyncThunk(
	"vote/submitVote",
	async ({ episodeId, rating }) => {
		const response = await submitVote(episodeId, rating);
		return handleApiResponse(response); // Use the helper function for response handling
	}
);

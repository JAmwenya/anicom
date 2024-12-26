// /src/features/vote/voteAction.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import { submitVote, updateVote, fetchVoteById, fetchVotes, deleteVote } from "../../api/voteAPI";

// Helper function to handle response and errors
const handleApiResponse = (response) => {
	if (response.error) {
		throw new Error(response.error);
	}
	return response.votes;
};

// Async thunk for submitting a vote
export const submitVoteAsync = createAsyncThunk(
	"vote/submitVote",
    async ({ episodeId, rating }) => {
        const response = await submitVote(episodeId, rating);
        return handleApiResponse(response);
    }
);

// Async thunk for fetching all votes
export const fetchVotesAsync = createAsyncThunk(
    "vote/fetchVotes",
    async () => {
        const response = await fetchVotes();
        return handleApiResponse(response);
    }
);

// Async thunk for fetching a vote by ID
export const fetchVoteByIdAsync = createAsyncThunk(
    "vote/fetchVoteById",
    async (voteId) => {
        const response = await fetchVoteById(voteId);
        return handleApiResponse(response);
    }
);

// Async thunk for updating a vote
export const updateVoteAsync = createAsyncThunk(
    "vote/updateVote",
    async ({ voteId, rating }) => {
        const response = await updateVote(voteId, rating);
        return handleApiResponse(response);
    }
);

// Async thunk for deleting a vote
export const deleteVoteAsync = createAsyncThunk(
    "vote/deleteVote",
    async (voteId) => {
        const response = await deleteVote(voteId);
        return handleApiResponse(response);
    }
);

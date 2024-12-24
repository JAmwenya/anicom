// /src/features/episode/episodeAction.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
	fetchEpisodes,
	fetchEpisodeById,
	addEpisode,
	updateEpisode,
	patchEpisode,
	deleteEpisode,
} from "../../api/episodeAPI";

// Helper function to handle API response and errors
const handleApiResponse = (response) => {
	if (response.error) {
		throw new Error(response.error);
	}
	return response.episodeList || response.episode.data || {};
};

// Async thunk to fetch all episodes with pagination
export const fetchEpisodesAsync = createAsyncThunk(
	"episode/fetchEpisodes",
	async () => {
		const response = await fetchEpisodes();
		if (response.error) {
			throw new Error(response.error);
		}
		return {
			episodes: response.episodeList,
			totalEpisodes: response.totalEpisodes,
		};
	}
);

// Async thunk to fetch details of a specific episode by ID
export const fetchEpisodeByIdAsync = createAsyncThunk(
	"episode/fetchEpisodeById",
	async (episodeId) => {
		const response = await fetchEpisodeById(episodeId); // Fetch episode by ID
		return handleApiResponse(response); // Use helper function for handling response
	}
);

// Async thunk to add a new episode
export const addEpisodeAsync = createAsyncThunk(
	"episode/addEpisode",
	async (episodeData) => {
		const response = await addEpisode(episodeData); // Add new episode
		return handleApiResponse(response); // Use helper function for handling response
	}
);

// Async thunk to update an existing episode
export const updateEpisodeAsync = createAsyncThunk(
	"episode/updateEpisode",
	async ({ episodeId, episodeData }) => {
		const response = await updateEpisode(episodeId, episodeData); // Update episode by ID
		return handleApiResponse(response); // Use helper function for handling response
	}
);

// Async thunk to patch an episode
export const patchEpisodeAsync = createAsyncThunk(
	"episode/patchEpisode",
	async ({ episodeId, episodeData }) => {
		const response = await patchEpisode(episodeId, episodeData); // Patch episode by ID
		return handleApiResponse(response); // Use helper function for handling response
	}
);

// Async thunk to delete an episode
export const deleteEpisodeAsync = createAsyncThunk(
	"episode/deleteEpisode",
	async (episodeId) => {
		const response = await deleteEpisode(episodeId);
		return handleApiResponse(response);
	}
);

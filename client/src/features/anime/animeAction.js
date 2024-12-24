// /src/features/anime/animeAction.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchAnimeList, fetchAnimeDetails } from "../../api/animeAPI";

// Helper function for handling the response and errors
const handleApiResponse = (response) => {
	if (response.error) {
		throw new Error(response.error);
	}
    return response.data?.data || response.animeList || response.anime;
};

// Async thunk to fetch list of anime
export const fetchAnimeListAsync = createAsyncThunk(
	"anime/fetchAnimeList",
	async () => {
		const response = await fetchAnimeList();
		return handleApiResponse(response);
	}
);

// Async thunk to fetch details of a specific anime
export const fetchAnimeDetailsAsync = createAsyncThunk(
	"anime/fetchAnimeDetails",
	async (animeId) => {
		const response = await fetchAnimeDetails(animeId);
		return handleApiResponse(response);
	}
);


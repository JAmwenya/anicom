// /src/features/episode/episodeSlice.js
import { createSlice } from "@reduxjs/toolkit";
import {
	fetchEpisodesAsync,
	fetchEpisodeByIdAsync,
	addEpisodeAsync,
	updateEpisodeAsync,
	patchEpisodeAsync,
	deleteEpisodeAsync,
} from "./episodeAction";

// Initial state for the episode slice
const initialState = {
	episodeList: [],
	episodeDetails: null,
	totalEpisodes: 0,
	currentPage: 1,
	loading: false,
	error: null,
};

// Slice for episode state
const episodeSlice = createSlice({
	name: "episode",
	initialState,
	reducers: {
		// Define setCurrentPage reducer
		setCurrentPage: (state, action) => {
			state.currentPage = action.payload;
		},
	},
	extraReducers: (builder) => {
		// Handle async actions for episodes with pagination
		builder
			.addCase(fetchEpisodesAsync.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(fetchEpisodesAsync.fulfilled, (state, action) => {
				state.loading = false;
				state.episodeList = action.payload.episodes; // Ensuring episodes are correctly populated
				state.totalEpisodes = action.payload.totalEpisodes; // Correctly managing total episodes
			})
			.addCase(fetchEpisodesAsync.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message; // Set error
			});

		// Handle async actions for a specific episode by ID
		builder
			.addCase(fetchEpisodeByIdAsync.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(fetchEpisodeByIdAsync.fulfilled, (state, action) => {
				state.loading = false;
				state.episodeDetails = action.payload;
				console.log("Fulfilled Payload:", action.payload);
				state.error = null;
			})
			.addCase(fetchEpisodeByIdAsync.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message; // Set error
			});

		// Handle async actions for adding a new episode
		builder
			.addCase(addEpisodeAsync.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(addEpisodeAsync.fulfilled, (state, action) => {
				state.loading = false;
				state.episodeList.push(action.payload); // Add episode to the list
				state.error = null;
			})
			.addCase(addEpisodeAsync.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message; // Set error
			});

		// Handle async actions for updating an existing episode
		builder
			.addCase(updateEpisodeAsync.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(updateEpisodeAsync.fulfilled, (state, action) => {
				state.loading = false;
				const index = state.episodeList.findIndex(
					(episode) => episode.id === action.payload.id
				);
				if (index !== -1) {
					state.episodeList[index] = action.payload; // Update episode in the list
				}
				state.error = null;
			})
			.addCase(updateEpisodeAsync.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message; // Set error
			});

		// Handle async actions for patching an existing episode
		builder
			.addCase(patchEpisodeAsync.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(patchEpisodeAsync.fulfilled, (state, action) => {
				state.loading = false;
				const index = state.episodeList.findIndex(
					(episode) => episode.id === action.payload.id
				);
				if (index !== -1) {
					state.episodeList[index] = {
						...state.episodeList[index],
						...action.payload, // Patch episode fields
					};
				}
				state.error = null;
			})
			.addCase(patchEpisodeAsync.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message; // Set error
			});

		// Handle async actions for deleting an episode
		builder
			.addCase(deleteEpisodeAsync.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(deleteEpisodeAsync.fulfilled, (state, action) => {
				state.loading = false;
				state.episodeList = state.episodeList.filter(
					(episode) => episode.id !== action.payload.id // Remove episode from list
				);
				state.error = null;
			})
			.addCase(deleteEpisodeAsync.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message;
			});
	},
});

export const { setCurrentPage } = episodeSlice.actions;
export default episodeSlice.reducer;
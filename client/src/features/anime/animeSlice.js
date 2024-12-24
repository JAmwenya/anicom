// /src/features/anime/animeSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { fetchAnimeListAsync, fetchAnimeDetailsAsync } from "./animeAction";

// Initial state for the anime slice
const initialState = {
	animeList: [],
	animeDetails: null,
	loading: false,
	error: null,
};

// Utility function for handling pending, fulfilled, and rejected actions
const handleAsyncState = (state, action, type) => {
	state.loading = type === "pending";
	if (type === "rejected") {
		state.error = action.error.message;
	} else if (type === "fulfilled") {
		state.error = null;
	}
};

// Slice for anime state
const animeSlice = createSlice({
	name: "anime",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		// Handle fetchAnimeListAsync
		builder
			.addCase(fetchAnimeListAsync.pending, (state) =>
				handleAsyncState(state, {}, "pending")
			)
			.addCase(fetchAnimeListAsync.fulfilled, (state, action) => {
				handleAsyncState(state, action, "fulfilled");
				state.animeList = action.payload;
			})
			.addCase(fetchAnimeListAsync.rejected, (state, action) =>
				handleAsyncState(state, action, "rejected")
			);

		// Handle fetchAnimeDetailsAsync
		builder
			.addCase(fetchAnimeDetailsAsync.pending, (state) =>
				handleAsyncState(state, {}, "pending")
			)
			.addCase(fetchAnimeDetailsAsync.fulfilled, (state, action) => {
				console.log("Fulfilled Payload:", action.payload.data);
				handleAsyncState(state, action, "fulfilled");
				state.animeDetails = action.payload.data;
			})
			.addCase(fetchAnimeDetailsAsync.rejected, (state, action) =>
				handleAsyncState(state, action, "rejected")
			);
	},
});

export default animeSlice.reducer;

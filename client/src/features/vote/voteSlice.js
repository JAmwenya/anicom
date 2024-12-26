// /src/features/vote/voteSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { submitVoteAsync, fetchVoteByIdAsync, fetchVotesAsync, updateVoteAsync, deleteVoteAsync } from "./voteAction";

// Initial state for the vote slice
const initialState = {
	votes: [],
	loading: false,
	error: null,
};

// Helper function to handle common async state management
const handleAsyncState = (state, action, type) => {
	if (type === "pending") {
		state.loading = true;
		state.error = null; // Clear previous errors
	} else if (type === "fulfilled") {
		state.loading = false;
		state.votes = action.payload; // Update votes with the returned data
		state.error = null;
	} else if (type === "rejected") {
		state.loading = false;
		state.error = action.error.message; // Set the error message
	}
};

// Slice for vote state
const voteSlice = createSlice({
	name: "vote",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		// Handle submitVoteAsync
		builder
			.addCase(submitVoteAsync.pending, (state) =>
				handleAsyncState(state, {}, "pending")
			)
			.addCase(submitVoteAsync.fulfilled, (state, action) =>
				handleAsyncState(state, action, "fulfilled")
			)
			.addCase(submitVoteAsync.rejected, (state, action) =>
				handleAsyncState(state, action, "rejected")
			);

        // Handle fetchVotesAsync
        builder
            .addCase(fetchVotesAsync.pending, (state) =>
                handleAsyncState(state, {}, "pending")
            )
            .addCase(fetchVotesAsync.fulfilled, (state, action) =>
                handleAsyncState(state, action, "fulfilled")
            )
            .addCase(fetchVotesAsync.rejected, (state, action) =>
                handleAsyncState(state, action, "rejected")
            );

        // Handle fetchVoteByIdAsync
        builder
            .addCase(fetchVoteByIdAsync.pending, (state) =>
                handleAsyncState(state, {}, "pending")
            )
            .addCase(fetchVoteByIdAsync.fulfilled, (state, action) =>
                handleAsyncState(state, action, "fulfilled")
            )
            .addCase(fetchVoteByIdAsync.rejected, (state, action) =>
                handleAsyncState(state, action, "rejected")
            );

        // Handle updateVoteAsync
        builder
            .addCase(updateVoteAsync.pending, (state) =>
                handleAsyncState(state, {}, "pending")
            )
            .addCase(updateVoteAsync.fulfilled, (state, action) =>
                handleAsyncState(state, action, "fulfilled")
            )
            .addCase(updateVoteAsync.rejected, (state, action) =>
                handleAsyncState(state, action, "rejected")
            );

        // Handle deleteVoteAsync
        builder
            .addCase(deleteVoteAsync.pending, (state) =>
                handleAsyncState(state, {}, "pending")
            )
            .addCase(deleteVoteAsync.fulfilled, (state, action) =>
                handleAsyncState(state, action, "fulfilled")
            )
            .addCase(deleteVoteAsync.rejected, (state, action) =>
                handleAsyncState(state, action, "rejected")
            );
	},
});

export default voteSlice.reducer;

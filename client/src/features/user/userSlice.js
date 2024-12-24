// /src/features/user/userSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { fetchUserProfileAsync, updateUserProfileAsync } from "./userAction";

// Initial state for the user slice
const initialState = {
	profile: null,
	loading: false,
	error: null,
};

// Helper function to handle the common logic for pending, fulfilled, and rejected states
const handleAsyncState = (state, action, type) => {
	if (type === "pending") {
		state.loading = true;
		state.error = null; // Clear previous errors
	} else if (type === "fulfilled") {
		state.loading = false;
		state.profile = action.payload; // Update profile with the new data
		state.error = null;
	} else if (type === "rejected") {
		state.loading = false;
		state.error = action.error.message;
	}
};

// Slice for user state
const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		// Handle fetchUserProfileAsync
		builder
			.addCase(fetchUserProfileAsync.pending, (state) =>
				handleAsyncState(state, {}, "pending")
			)
			.addCase(fetchUserProfileAsync.fulfilled, (state, action) =>
				handleAsyncState(state, action, "fulfilled")
			)
			.addCase(fetchUserProfileAsync.rejected, (state, action) =>
				handleAsyncState(state, action, "rejected")
			);

		// Handle updateUserProfileAsync
		builder
			.addCase(updateUserProfileAsync.pending, (state) =>
				handleAsyncState(state, {}, "pending")
			)
			.addCase(updateUserProfileAsync.fulfilled, (state, action) =>
				handleAsyncState(state, action, "fulfilled")
			)
			.addCase(updateUserProfileAsync.rejected, (state, action) =>
				handleAsyncState(state, action, "rejected")
			);
	},
});

export default userSlice.reducer;

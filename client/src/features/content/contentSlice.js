// /src/features/content/contentSlice.js
import { createSlice } from "@reduxjs/toolkit";
import {
    fetchContentAsync,
    fetchContentByIdAsync,
    submitContentAsync,
} from "./contentAction";

// Initial state for the content slice
const initialState = {
	contentList: [],
	content: null,
	submittedContent: null,
	loading: false,
	error: null,
	currentPage: 1,
	totalPages: 0,
};

// Helper function to handle pending, fulfilled, and rejected states
const handleAsyncState = (state, action, type) => {
    if (type === "pending") {
        state.loading = true;
        state.error = null; // Clear any previous errors
    } else if (type === "fulfilled") {
        state.loading = false;
        state.error = null;
    } else if (type === "rejected") {
        state.loading = false;
        state.error = action.error.message || "Something went wrong";
    }
};

// Slice for content state
const contentSlice = createSlice({
	name: "content",
	initialState,
	reducers: {
		// Define setCurrentPage reducer
		setCurrentPage: (state, action) => {
			state.currentPage = action.payload;
		},
	},
	extraReducers: (builder) => {
		// Handle fetchContentAsync (fetch all content)
		builder
			.addCase(fetchContentAsync.pending, (state) =>
				handleAsyncState(state, {}, "pending")
			)
			.addCase(fetchContentAsync.fulfilled, (state, action) => {
				state.loading = false;
				state.contentList = action.payload.contentList;
                state.totalContent = action.payload.totalContent;
			})
			.addCase(fetchContentAsync.rejected, (state, action) =>
				handleAsyncState(state, action, "rejected")
			);

		// Handle fetchContentByIdAsync (fetch content by ID)
		builder
			.addCase(fetchContentByIdAsync.pending, (state) =>
				handleAsyncState(state, {}, "pending")
			)
			.addCase(fetchContentByIdAsync.fulfilled, (state, action) => {
				handleAsyncState(state, action, "fulfilled");
				state.content = action.payload;
				console.log("Fulfilled Payload:", action.payload);
			})
			.addCase(fetchContentByIdAsync.rejected, (state, action) =>
				handleAsyncState(state, action, "rejected")
			);

		// Handle submitContentAsync (submit new content)
		builder
			.addCase(submitContentAsync.pending, (state) =>
				handleAsyncState(state, {}, "pending")
			)
			.addCase(submitContentAsync.fulfilled, (state, action) => {
				handleAsyncState(state, action, "fulfilled");
				state.submittedContent = action.payload; // Update submitted content
			})
			.addCase(submitContentAsync.rejected, (state, action) =>
				handleAsyncState(state, action, "rejected")
			);
	},
});

export const { setCurrentPage } = contentSlice.actions;
export default contentSlice.reducer;

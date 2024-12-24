// /src/features/content/contentAction.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
	fetchAllContent,
	submitContent,
	fetchContentById,
} from "../../api/contentAPI";

// Helper function to handle API response and errors
const handleApiResponse = (response) => {
	if (response.error) {
		throw new Error(response.error);
	}
	return response.contentList || response.content.data;
};

// Async thunk to fetch all content (with pagination)
export const fetchContentAsync = createAsyncThunk(
    "content/fetchContent",
    async () => {
        const response = await fetchAllContent();
		if (response.error) {
			throw new Error(response.error);
		}
		return {
            contentList: response.contentList,
            totalContent: response.totalContent,
        };
    }
);

// Async thunk to fetch content by ID
export const fetchContentByIdAsync = createAsyncThunk(
	"content/fetchContentById",
	async (contentId) => {
		const response = await fetchContentById(contentId);
		return handleApiResponse(response); // Use helper function for handling response
	}
);

// Async thunk to submit content (review, fan art, etc.)
export const submitContentAsync = createAsyncThunk(
	"content/submitContent",
	async ({ animeId, contentType, content }) => {
		const response = await submitContent(animeId, contentType, content);
		return handleApiResponse(response); // Use helper function for handling response
	}
);

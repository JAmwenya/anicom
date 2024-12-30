// /src/features/content/contentAction.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
	fetchAllContent,
	submitContent,
	fetchContentById,
    patchContent,
    deleteContent,
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
		return handleApiResponse(response);
	}
);

// Async thunk to submit content (review, fan art, etc.)
export const submitContentAsync = createAsyncThunk(
	"content/submitContent",
	async (payload) => {
		console.log("Payload received in submitContentAsync:", payload);
		const { animeId, contentType, title, body } = payload;

		if (!animeId || !contentType || !title || !body) {
			console.error("Invalid payload. Missing required fields.");
			throw new Error("Invalid payload");
		}

		const response = await submitContent(animeId, contentType, title, body);
		return handleApiResponse(response);
	}
);

// Async thunk to patch content (review, fan art, etc.)
export const patchContentAsync = createAsyncThunk(
	"content/patchContent",
	async (content) => {
		const { title, body, contentType, animeId } = content;
		console.log("Patching content with:", { title, body, contentType, animeId }); // Debug log

		// Validate all required fields
		if (!title || !body || !contentType || !animeId) {
			throw new Error("Invalid content data. Missing required fields.");
		}

		const response = await patchContent(content);
		return handleApiResponse(response);
	}
);



// Async thunk to delete content by ID
export const deleteContentAsync = createAsyncThunk(
    "content/deleteContent",
    async (contentId) => {
        const response = await deleteContent(contentId);
        return handleApiResponse(response); // Use helper function for handling response
    }
);

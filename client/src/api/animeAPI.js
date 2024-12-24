// /src/api/animeAPI.js
import { getRequest } from "./FetchUtils";

const API_URL = "/anime";

// Fetch list of anime
export const fetchAnimeList = async () => {
	try {
		const { data, status, error } = await getRequest(`${API_URL}`);
		console.log("Response from backend:", { data, status, error });

		if (status === 200) {
			return { animeList: data.data };
		} else {
			throw new Error(error || "Failed to fetch anime list");
		}
	} catch (error) {
		console.error("Error fetching anime list:", error);
		return { error: error.message };
	}
};

// Fetch details of a specific anime
export const fetchAnimeDetails = async (animeId) => {
	try {
		const { data, status, error } = await getRequest(`${API_URL}/${animeId}`);
		console.log("Response for anime details:", { data, status, error });

		if (status === 200) {
			return { anime: data };
		} else {
			throw new Error(error || "Failed to fetch anime details");
		}
	} catch (error) {
		console.error("Error fetching anime details:", error);
		return { error: error.message };
	}
};

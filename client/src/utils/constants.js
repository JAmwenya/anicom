// /src/utils/constants.js

export const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000"; // Base URL for the backend API
export const ERROR_MESSAGE = "Something went wrong, please try again later";
export const SUCCESS_MESSAGE = "Action completed successfully";

// API Paths
export const API_PATHS = {
	login: "/api/auth/login",
	register: "/api/auth/register",
	getAnime: "/api/anime",
	getEpisodes: "/api/episodes",
	getUserProfile: "/api/user/profile",
};

// Other constants
export const DEFAULT_AVATAR = "/assets/placeholder-avatars/char1.png"; // Default avatar for users

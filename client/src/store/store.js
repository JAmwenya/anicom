// /src/store/store.js
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import userReducer from "../features/user/userSlice";
import animeReducer from "../features/anime/animeSlice";
import episodeReducer from "../features/episode/episodeSlice";
import voteReducer from "../features/vote/voteSlice";
import contentReducer from "../features/content/contentSlice";

const store = configureStore({
	reducer: {
		auth: authReducer,
		user: userReducer,
		anime: animeReducer,
		episode: episodeReducer,
		vote: voteReducer,
		content: contentReducer,
	},
});

export default store;

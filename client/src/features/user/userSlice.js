// /src/features/user/userSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
	fetchUserProfileAsync,
	fetchUserByIdAsync,
	fetchAllUsersAsync,
	updateUserProfileAsync,
	patchUserProfileAsync,
	updateUserAvatarAsync,
	deleteUserAsync,
} from "./userAction";

// Initial state for the user slice
const initialState = {
	profile: JSON.parse(localStorage.getItem("userProfile")) || null,
	users: [],
	selectedUser: null,
	loading: false,
	error: null,
	message: null,
};

// Persist user data to localStorage whenever the profile changes
const persistUserToLocalStorage = (profile) => {
	if (profile) {
		localStorage.setItem("userProfile", JSON.stringify(profile));
	} else {
		localStorage.removeItem("userProfile"); // Remove from localStorage when logged out
	}
};

// Rehydrate profile on app initialization
export const rehydrateProfile = createAsyncThunk(
	"user/rehydrateProfile",
	async (_, thunkAPI) => {
		const profile = JSON.parse(localStorage.getItem("userProfile"));
		return profile || null;
	}
);

const handleAsyncState = (state, action, type, property) => {
	if (type === "pending") {
		state.loading = true;
		state.error = null;
	} else if (type === "fulfilled") {
		state.loading = false;
		state[property] = action.payload;
		state.error = null;

		// Persist the profile data to localStorage on successful login or update
		if (property === "profile") {
			persistUserToLocalStorage(action.payload);
		}
	} else if (type === "rejected") {
		state.loading = false;
		state.error = action.payload;
	}
};

const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		clearError: (state) => {
			state.error = null;
		},
		resetState: () => initialState,
	},
	extraReducers: (builder) => {
		// Fetch profile
		builder
			.addCase(fetchUserProfileAsync.pending, (state) =>
				handleAsyncState(state, {}, "pending")
			)
			.addCase(fetchUserProfileAsync.fulfilled, (state, action) =>
				handleAsyncState(state, action, "fulfilled", "profile")
			)
			.addCase(fetchUserProfileAsync.rejected, (state, action) =>
				handleAsyncState(state, action, "rejected")
			)

			.addCase(rehydrateProfile.fulfilled, (state, action) => {
				state.profile = action.payload;
			})

			// Fetch user by ID
			.addCase(fetchUserByIdAsync.pending, (state) =>
				handleAsyncState(state, {}, "pending", "selectedUser")
			)
			.addCase(fetchUserByIdAsync.fulfilled, (state, action) =>
				handleAsyncState(state, action, "fulfilled", "selectedUser")
			)
			.addCase(fetchUserByIdAsync.rejected, (state, action) =>
				handleAsyncState(state, action, "rejected", "selectedUser")
			)

			// Fetch all users
			.addCase(fetchAllUsersAsync.pending, (state) =>
				handleAsyncState(state, {}, "pending", "users")
			)
			.addCase(fetchAllUsersAsync.fulfilled, (state, action) =>
				handleAsyncState(state, action, "fulfilled", "users")
			)
			.addCase(fetchAllUsersAsync.rejected, (state, action) =>
				handleAsyncState(state, action, "rejected", "users")
			)

			// Update user profile
			.addCase(updateUserProfileAsync.pending, (state) =>
				handleAsyncState(state, {}, "pending", "profile")
			)
			.addCase(updateUserProfileAsync.fulfilled, (state, action) =>
				handleAsyncState(state, action, "fulfilled", "profile")
			)
			.addCase(updateUserProfileAsync.rejected, (state, action) =>
				handleAsyncState(state, action, "rejected", "profile")
			)

			// Patch user profile
			.addCase(patchUserProfileAsync.pending, (state) =>
				handleAsyncState(state, {}, "pending", "profile")
			)
			.addCase(patchUserProfileAsync.fulfilled, (state, action) =>
				handleAsyncState(state, action, "fulfilled", "profile")
			)
			.addCase(patchUserProfileAsync.rejected, (state, action) =>
				handleAsyncState(state, action, "rejected", "profile")
			)

			// Update avatar
			.addCase(updateUserAvatarAsync.pending, (state) =>
				handleAsyncState(state, {}, "pending", "profile")
			)
			.addCase(updateUserAvatarAsync.fulfilled, (state, action) =>
				handleAsyncState(state, action, "fulfilled", "profile")
			)
			.addCase(updateUserAvatarAsync.rejected, (state, action) =>
				handleAsyncState(state, action, "rejected", "profile")
			)

			// Delete user
			.addCase(deleteUserAsync.pending, (state) =>
				handleAsyncState(state, {}, "pending", "message")
			)
			.addCase(deleteUserAsync.fulfilled, (state, action) =>
				handleAsyncState(state, action, "fulfilled", "message")
			)
			.addCase(deleteUserAsync.rejected, (state, action) =>
				handleAsyncState(state, action, "rejected", "message")
			);
	},
});

export const { clearError, resetState } = userSlice.actions;

export default userSlice.reducer;

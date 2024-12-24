// /src/features/auth/authSlice.js
import { createSlice } from "@reduxjs/toolkit";
import {
	loginUserAsync,
	registerUserAsync,
	logoutUserAsync,
} from "./authAction";

// Initial state for the auth slice
const initialState = {
	user: null,
	token: null,
	loading: false,
	error: null,
	isAuthenticated: false,
};

// Helper function to set user, token, and authentication state
const setAuthState = (state, { user, token }) => {
	state.user = user;
	state.token = token;
	state.isAuthenticated = true;
	state.error = null;
};

// Helper function to handle pending state for any async action
const handlePending = (state) => {
	state.loading = true;
	state.error = null;
};

// Helper function to handle rejected state for any async action
const handleRejected = (state, action) => {
	state.loading = false;
	state.error = action.error.message;
};

// Slice for authentication state
const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		// Action to set user and token manually
		setUser: (state, action) => {
			setAuthState(state, action.payload);
		},
		logout: (state) => {
			state.user = null;
			state.token = null;
			state.isAuthenticated = false;
		},
	},
	extraReducers: (builder) => {
		// Handle loginUserAsync
		builder
			.addCase(loginUserAsync.pending, (state) => handlePending(state))
			.addCase(loginUserAsync.fulfilled, (state, action) => {
				state.loading = false;
				setAuthState(state, action.payload);
			})
			.addCase(loginUserAsync.rejected, (state, action) =>
				handleRejected(state, action)
			);

		// Handle registerUserAsync
		builder
			.addCase(registerUserAsync.pending, (state) => handlePending(state))
			.addCase(registerUserAsync.fulfilled, (state, action) => {
				state.loading = false;
				setAuthState(state, action.payload);
			})
			.addCase(registerUserAsync.rejected, (state, action) =>
				handleRejected(state, action)
			);

		// Handle logoutUserAsync
		builder.addCase(logoutUserAsync.fulfilled, (state) => {
			state.user = null;
			state.token = null;
			state.isAuthenticated = false;
		});
	},
});

export const { setUser, logout } = authSlice.actions;

export default authSlice.reducer;

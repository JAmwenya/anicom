// /src/features/auth/authSlice.js
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

// Utility function to set authentication state
const setAuthState = (state, { user, token }) => {
	state.user = user;
	state.token = token;
	state.isAuthenticated = !!token; // Ensure authenticated state matches token presence
	state.error = null;
	state.loading = false;
};

// Utility function to reset authentication state
const resetAuthState = (state) => {
	state.user = null;
	state.token = null;
	state.isAuthenticated = false;
	state.error = null;
	state.loading = false;
};

// Utility function for pending state
const setPendingState = (state) => {
	state.loading = true;
	state.error = null;
};

// Utility function for rejected state
const setRejectedState = (state, error) => {
	state.loading = false;
	state.error = error.message || "An unexpected error occurred";
};

// Create the auth slice
const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		// Manually set user and token (e.g., after rehydration)
		setUser: (state, action) => {
			setAuthState(state, action.payload);
		},

		// Logout and reset the state
		logout: (state) => {
			resetAuthState(state);
		},
	},

	extraReducers: (builder) => {
		// Handle async actions for login
		builder
			.addCase(loginUserAsync.pending, setPendingState)
			.addCase(loginUserAsync.fulfilled, (state, action) => {
				setAuthState(state, action.payload);
			})
			.addCase(loginUserAsync.rejected, (state, action) => {
				setRejectedState(state, action.error);
			});

		// Handle async actions for registration
		builder
			.addCase(registerUserAsync.pending, setPendingState)
			.addCase(registerUserAsync.fulfilled, (state, action) => {
				setAuthState(state, action.payload);
			})
			.addCase(registerUserAsync.rejected, (state, action) => {
				setRejectedState(state, action.error);
			});

		// Handle async actions for logout
		builder
			.addCase(logoutUserAsync.pending, setPendingState)
			.addCase(logoutUserAsync.fulfilled, resetAuthState)
			.addCase(logoutUserAsync.rejected, (state, action) => {
				setRejectedState(state, action.error);
			});
	},
});

export const { setUser, logout } = authSlice.actions;

export default authSlice.reducer;

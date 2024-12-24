// /src/routes/Router.js
import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Profile from "../pages/Profile";
import ContentPage from "../pages/ContentPage";
import EpisodePage from "../pages/EpisodePage";
import AnimeDetail from "../pages/AnimeDetail";
import EpisodeDetail from "../pages/EpisodeDetail";
import ContentDetail from "../pages/ContentDetail";
// import ProtectedRoute from "./ProtectedRoute";

const RouterComponent = () => {
	return (
		<Routes>
			<Route
				path="/"
				element={<Home />}
			/>
			<Route
				path="/content"
				element={<ContentPage />}
			/>
			<Route
				path="/episode"
				element={<EpisodePage />}
			/>
			<Route
				path="/login"
				element={<Login />}
			/>
			<Route
				path="/register"
				element={<Register />}
			/>
			{/* Protect routes */}
			<Route
				path="/profile"
				element={<Profile />}
			/>
			<Route
				path="/anime/:id"
				element={<AnimeDetail />}
			/>
			<Route
				path="/episode/:id"
				element={<EpisodeDetail />}
			/>
			<Route
				path="/content/:id"
				element={<ContentDetail />}
			/>
		</Routes>
	);
};

export default RouterComponent;

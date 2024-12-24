// /src/routes/ProtectedRoute.js
import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ element, ...rest }) => {
	const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

	// If the user is authenticated, render the protected component
	return isAuthenticated ? (
		React.cloneElement(element, { ...rest })
	) : (
		<Navigate to="/register" />
	);
};

export default ProtectedRoute;

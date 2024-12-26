// /src/routes/ProtectedRoute.js
import React from "react";
import Loader from "../components/Loader";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children }) => {
	const { isAuthenticated, loading, user } = useSelector((state) => state.auth);

	// If authentication state is still loading, you can either render a loader or just return null
	if (loading) {
		return <Loader />;
	}
	if (!isAuthenticated || !user) {
		
		setTimeout(() => (""), 3000);

		return (
			<>
				<Navigate
					to="/login"
					replace
				/>
			</>
		);
	}

	// Render the protected content
	return children;
};

export default ProtectedRoute;

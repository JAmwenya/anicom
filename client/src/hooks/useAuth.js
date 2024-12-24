// /src/hooks/useAuth.js
import { useDispatch, useSelector } from "react-redux";
import { setUser, logout } from "../features/auth/authSlice";
import { useEffect } from "react";
import { fetchUserProfileAsync} from "../features/user/userAction";

const useAuth = () => {
	const dispatch = useDispatch();
	const token = useSelector((state) => state.auth.token);
	const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
	const user = useSelector((state) => state.auth.user);

	// Check if user is authenticated on component mount
	useEffect(() => {
		if (token) {
			fetchUserProfileAsync(dispatch, token);
		}
	}, [token, dispatch]);

	const login = (userData, token) => {
		dispatch(setUser({ user: userData, token }));
	};

	const logoutUser = () => {
		dispatch(logout());
	};

	return {
		user,
		isAuthenticated,
		login,
		logoutUser,
	};
};

export default useAuth;

// /src/hooks/useProfile.js
import { useDispatch, useSelector } from "react-redux";
import { setProfile, clearProfile } from "../features/user/userSlice";
import { fetchUserProfile } from "../features/user/userAPI";

const useProfile = () => {
	const dispatch = useDispatch();
	const profile = useSelector((state) => state.user.profile);
	const token = useSelector((state) => state.auth.token);

	// Fetch user profile if available
	const fetchProfile = () => {
		if (token) {
			fetchUserProfile(dispatch, token);
		}
	};

	const updateProfile = (profileData) => {
		dispatch(setProfile(profileData));
	};

	const clearUserProfile = () => {
		dispatch(clearProfile());
	};

	return {
		profile,
		fetchProfile,
		updateProfile,
		clearUserProfile,
	};
};

export default useProfile;

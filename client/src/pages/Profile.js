// /src/pages/Profile.js
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	fetchUserProfileAsync,
	deleteUserAsync,
} from "../features/user/userAction";
import useAuth from "../hooks/useAuth";
import AvatarSelector from "../components/AvatarSelector";
import placeholderAvatar from "../assets/placeholder-avatars/char0.png";
import styles from "../styles/Profile.module.css";

const Profile = () => {
	const dispatch = useDispatch();
	const { user, logoutUser } = useAuth();
	const profile = useSelector((state) => state.user.profile);
	const error = useSelector((state) => state.user.error);
	const message = useSelector((state) => state.user.message);
	const [avatar, setAvatar] = useState(profile?.avatar || placeholderAvatar);

	useEffect(() => {
		if (user) {
			dispatch(fetchUserProfileAsync(user.token));
		}
	}, [dispatch, user]);

	const handleAvatarSelect = (selectedAvatar) => {
		setAvatar(selectedAvatar);
	};

	const handleDeleteAccount = () => {
		dispatch(deleteUserAsync({ userId: profile.id, token: user.token }));
	};

	const handleLogout = () => {
		logoutUser();
	};

	return (
		<div className={styles.container}>
			<h1 className={styles.heading}>Profile</h1>
			{message && <p className={styles.successMessage}>{message}</p>}
			{error && <p className={styles.errorMessage}>{error}</p>}

			<div className={styles.profileWrapper}>
				{/* Left column: Avatar & basic information */}
				<div className={styles.leftColumn}>
					<div className={styles.avatarContainer}>
						<img
							src={avatar || "../assets/placeholder-avatars/char1.png"}
							alt="Avatar"
							className={styles.avatar}
						/>
						<AvatarSelector onAvatarSelect={handleAvatarSelect} />
					</div>
					<div className={styles.basicInfo}>
						<h3>{profile?.username}</h3>
						<p>{profile?.email}</p>
					</div>
				</div>

				{/* Right column: Editable fields */}
				<div className={styles.rightColumn}>
					<div className={styles.buttonsContainer}>
						<button
							onClick={handleDeleteAccount}
							className={styles.deleteButton}>
							Delete Account
						</button>
						<button
							onClick={handleLogout}
							className={styles.logoutButton}>
							Logout
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Profile;

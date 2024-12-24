// /src/pages/Profile.js
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserProfileAsync } from "../features/user/userAction";
import useAuth from "../hooks/useAuth";
import AvatarSelector from "../components/AvatarSelector";
import placeholderAvatar from "../assets/placeholder-avatars/char0.png";
import styles from "../styles/Profile.module.css";

const Profile = () => {
	const dispatch = useDispatch();
	const { user, logoutUser } = useAuth();
	const profile = useSelector((state) => state.user.profile);
	const [avatar, setAvatar] = useState(profile?.avatar || placeholderAvatar);

	useEffect(() => {
		if (user) {
			fetchUserProfileAsync(dispatch, user.token);
		}
	}, [dispatch, user]);

	const handleAvatarSelect = (selectedAvatar) => {
		setAvatar(selectedAvatar);
	};

	const handleLogout = () => {
		logoutUser();
	};

	return (
		<div className={styles.container}>
			<h1 className={styles.heading}>Profile</h1>
			<div>
				<h3 className={styles.username}>{profile?.username}</h3>
				<p className={styles.email}>{profile?.email}</p>
				<div className={styles.avatarContainer}>
					<h4>Avatar</h4>
					<img
						src={avatar || "../assets/placeholder-avatars/char1.png"}
						alt="Avatar"
						className={styles.avatar}
					/>
					<AvatarSelector onAvatarSelect={handleAvatarSelect} />
				</div>
				<button
					onClick={handleLogout}
					className={styles.logoutButton}>
					Logout
				</button>
			</div>
		</div>
	);
};

export default Profile;

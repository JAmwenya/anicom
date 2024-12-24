// /src/components/ProfileCard.js
import React from "react";
import styles from "../styles/ProfileCard.module.css";

const ProfileCard = ({ username, email, avatar }) => {
	return (
		<div className={styles.card}>
			<img
				src={avatar}
				alt={username}
				className={styles.avatar}
			/>
			<h3>{username}</h3>
			<p>{email}</p>
		</div>
	);
};

export default ProfileCard;

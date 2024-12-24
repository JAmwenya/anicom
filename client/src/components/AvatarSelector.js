// /src/components/AvatarSelector.js
import React from "react";
import styles from "../styles/AvatarSelector.module.css";

// Import avatars directly
import char1 from "../assets/placeholder-avatars/char1.png";
import char2 from "../assets/placeholder-avatars/char2.png";
import char3 from "../assets/placeholder-avatars/char3.png";
import char4 from "../assets/placeholder-avatars/char4.png";

const AvatarSelector = ({ onAvatarSelect }) => {
	const avatars = [char1, char2, char3, char4]; // Use imported images

	return (
		<div className={styles.selector}>
			{avatars.map((avatar, index) => (
				<img
					key={index}
					src={avatar}
					alt={`Avatar ${index + 1}`}
					onClick={() => onAvatarSelect(avatar)}
					className={styles.avatar}
				/>
			))}
		</div>
	);
};

export default AvatarSelector;

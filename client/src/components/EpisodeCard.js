// /src/components/EpisodeCard.js
import React from "react";
import styles from "../styles/EpisodeCard.module.css";

const EpisodeCard = ({ title, onClick, animeImage }) => {
	return (
		<div
			className={styles.card}
			onClick={onClick}>
			{/* Image as background */}
			<div className={styles.cardImageContainer}>
				{animeImage && (
					<img
						src={animeImage}
						alt={title}
						className={styles.cardImage}
					/>
				)}
			</div>

			{/* Episode Title Overlay */}
			<div className={styles.cardInfo}>
				<h4>{title}</h4>
			</div>
		</div>
	);
};

export default EpisodeCard;

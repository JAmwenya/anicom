// /src/components/AnimeCard.js
import React from "react";
import placeholderImage from "../assets/placeholder-avatars/placeholder.jpg";
import styles from "../styles/AnimeCard.module.css";

const AnimeCard = ({ title, image, onClick }) => {
	return (
		<div
			className={styles.card}
			onClick={onClick}>
			<img
				src={image || placeholderImage}
				alt={title}
				className={styles.cardImage}
			/>
			<div className={styles.cardInfo}>
				<h2>{title}</h2>
			</div>
		</div>
	);
};

export default AnimeCard;

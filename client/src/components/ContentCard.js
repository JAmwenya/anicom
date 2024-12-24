// /src/components/ContentCard.js
import React from "react";
import styles from "../styles/ContentCard.module.css";

const ContentCard = ({ title, contentType, onClick, description, image }) => {
	// Default image if no image is provided
	const defaultImage = "path/to/default/image.jpg";

	return (
		<div
			className={styles.card}
			onClick={onClick}>
			{/* Image */}
			<div
				className={styles.cardImageContainer}
				style={{
					backgroundImage: `url(${image || defaultImage})`,
				}}></div>

			{/* Text Overlay */}
			<div className={styles.cardInfo}>
				<h4 className={styles.cardTitle}>{`${title}`}</h4>
				<h5 className={styles.cardType}>{`${contentType}`}</h5>
				<p className={styles.cardDescription}>{description}</p>
			</div>
		</div>
	);
};

export default ContentCard;

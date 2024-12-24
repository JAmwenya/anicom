// /src/components/StarButton.js
import React from "react";
import styles from "../styles/StarButton.module.css";

const StarButton = ({ rating, onClick, className }) => {
	return (
		<button
			className={`${styles.starButton} ${className}`}
			onClick={() => onClick(rating)}>
			{rating} ⭐
		</button>
	);
};

export default StarButton;

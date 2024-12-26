// /src/components/StarButton.js
import React from "react";
import "../styles/StarButton.module.css";

const StarButton = ({ rating, onClick, className }) => {
	return (
		<button
			className={`star-button ${className}`}
			onClick={() => onClick(rating)}>
			{/* Render all 5 stars dynamically */}
			{[...Array(5)].map((_, index) => (
				<span
					key={index}
					className={`fa fa-star ${
						index + 1 <= rating ? "checked" : "unchecked"
					}`}></span>
			))}
		</button>
	);
};

export default StarButton;

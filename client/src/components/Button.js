// /src/components/Button.js
import React from "react";
import styles from "../styles/Button.module.css";

const Button = ({ text, onClick, className, disabled }) => {
	return (
		<button
			className={`${styles.button} ${className}`}
			onClick={onClick}
			disabled={disabled}>
			{text}
		</button>
	);
};

export default Button;

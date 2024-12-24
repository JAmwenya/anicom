// /src/components/Modal.js
import React from "react";
import styles from "../styles/Modal.module.css";

const Modal = ({ message, onClose, type }) => {
	return (
		<div className={styles.modalOverlay}>
			<div className={styles.modalContainer}>
				<div
					className={`${styles.modalContent} ${
						type === "error" ? styles.error : styles.success
					}`}>
					<p>{message}</p>
					<button
						onClick={onClose}
						className={styles.closeButton}>
						Close
					</button>
				</div>
			</div>
		</div>
	);
};

export default Modal;

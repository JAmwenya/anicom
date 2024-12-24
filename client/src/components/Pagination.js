// src/components/Pagination.js
import React, { memo } from "react";
import styles from "../styles/Pagination.module.css";

const Pagination = memo(({ currentPage, totalPages, onPageChange }) => {
	const changePage = (newPage) => {
		if (newPage >= 1 && newPage <= totalPages) {
			onPageChange(newPage);
		}
	};

	// Generate an array of page numbers
	const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

	return (
		<div
			className={styles.pagination}
			role="navigation"
			aria-label="Pagination Navigation">
			<button
				disabled={currentPage === 1}
				onClick={() => changePage(currentPage - 1)}
				aria-label="Go to the previous page"
				className={styles.button}>
				Previous
			</button>

			{/* Page Numbers */}
			{pageNumbers.map((number) => (
				<button
					key={number}
					onClick={() => changePage(number)}
					aria-label={`Go to page ${number}`}
					className={`${styles.button} ${
						number === currentPage ? styles.active : ""
					}`}>
					{number}
				</button>
			))}

			<button
				disabled={currentPage === totalPages}
				onClick={() => changePage(currentPage + 1)}
				aria-label="Go to the next page"
				className={styles.button}>
				Next
			</button>
		</div>
	);
});

export default Pagination;

// /src/pages/ContentPage.js
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchContentAsync } from "../features/content/contentAction";
import { setCurrentPage } from "../features/content/contentSlice";
import Loader from "../components/Loader";
import Pagination from "../components/Pagination";
import { useNavigate } from "react-router-dom";
import styles from "../styles/ContentPage.module.css";

const ContentPage = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { contentList, loading, error, totalContent, currentPage } =
		useSelector((state) => state.content);

	const itemsPerPage = 10;

	useEffect(() => {
		// Fetch content when the page loads
		dispatch(fetchContentAsync());
	}, [dispatch]);

	const handlePageChange = (newPage) => {
		dispatch(setCurrentPage(newPage));
	};

	const startIndex = (currentPage - 1) * itemsPerPage;

	// Ensure contentList is treated as an array
	const paginatedContent = Array.isArray(contentList)
		? contentList.slice(startIndex, startIndex + itemsPerPage)
		: [];

	// Show loading state while fetching content
	if (loading) {
		return <Loader />;
	}

	if (error) {
		return <div className={styles.noContentMessage}>Error: {error}</div>;
	}

	if (!Array.isArray(contentList) || contentList.length === 0) {
		return <div className={styles.noContentMessage}>No content found.</div>;
	}

	const handleContentClick = (contentId) => {
		console.log(`Navigate to content ${contentId}`);
		navigate(`/content/${contentId}`);
	};

	return (
		<div className={styles.container}>
			{/* Title */}
			<h2 className={styles.heading}>Content</h2>

			{/* Pagination */}
			<div className={styles.pagination}>
				<Pagination
					currentPage={currentPage}
					totalPages={Math.ceil(totalContent / itemsPerPage)}
					onPageChange={handlePageChange}
				/>
			</div>

			{/* Content List (List format instead of cards) */}
			<div className={styles.contentList}>
				{paginatedContent.map((content) => (
					<div
						key={content.id}
						className={styles.contentItem}
						onClick={() => handleContentClick(content.id)}>
						{/* Optionally, add image */}
						{content.image && (
							<img
								src={content.image}
								alt={content.title}
								className={styles.contentImage}
							/>
						)}
						{/* Title and Description */}
						<div className={styles.contentText}>
							<h4>{content.title}</h4>
							<h5>{content.contentType}</h5>
							<p>{content.description}</p>
						</div>
					</div>
				))}
			</div>

			{/* Pagination */}
			<div className={styles.pagination}>
				<Pagination
					currentPage={currentPage}
					totalPages={Math.ceil(totalContent / itemsPerPage)}
					onPageChange={handlePageChange}
				/>
			</div>
		</div>
	);
};

export default ContentPage;

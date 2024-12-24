// /src/pages/ContentDetail.js
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchContentByIdAsync } from "../features/content/contentAction";
import { useParams } from "react-router-dom";
import Loader from "../components/Loader";
import styles from "../styles/ContentDetail.module.css";

const ContentDetail = () => {
	const { id } = useParams();
	const dispatch = useDispatch();

	// Extract content, loading, and error states from the Redux store
	const { content, loading, error } = useSelector((state) => state.content);

	// Fetch content by ID when the component mounts or the id changes
	useEffect(() => {
		dispatch(fetchContentByIdAsync(id));
	}, [dispatch, id]);

	// Show loading state while fetching content details
	if (loading) {
		return <Loader />;
	}

	// Show error message if fetching failed
	if (error) {
		return <div className={styles.errorMessage}>Error: {error}</div>;
	}

	// Show message if content is not found
	if (!content) {
		return <div className={styles.errorMessage}>No content found.</div>;
	}

	return (
		<div className={styles.container}>
			{/* Title */}
			<h1 className={styles.title}>{content.title}</h1>
			{/* Description */}
			<p className={styles.description}>{content.body}</p>{" "}
			{/* Assuming body is the content's main body */}
			{/* Anime Information */}
			<div className={styles.animeInfo}>
				<h2>Anime Information</h2>
				<p>
					<strong>Genre:</strong> {content.anime.genre}
				</p>
				<p>
					<strong>Release Date:</strong> {content.anime.release_date}
				</p>
				<p>
					<strong>Description:</strong> {content.anime.description}
				</p>
			</div>
			{/* Image (if available) */}
			{content.anime.image && (
				<img
					src={content.anime.image}
					alt={content.anime.title}
					className={styles.image}
				/>
			)}
		</div>
	);
};

export default ContentDetail;

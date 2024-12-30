// /src/pages/ContentDetail.js
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	fetchContentByIdAsync,
	// patchContentAsync,
	deleteContentAsync,
} from "../features/content/contentAction";
import { useParams, useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import styles from "../styles/ContentDetail.module.css";

const ContentDetail = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const dispatch = useDispatch();

	// Extract content, loading, and error states from the Redux store
	const { content, loading, error } = useSelector((state) => state.content);

	// Local state for form inputs
    const [animeId, setAnimeId] = useState("");
	const [title, setTitle] = useState("");
    const[contentType, setContentType] = useState("");
	const [body, setBody] = useState("");

	// Fetch content by ID when the component mounts or the id changes
	useEffect(() => {
		dispatch(fetchContentByIdAsync(id));
	}, [dispatch, id]);

	// Update local state when content is fetched
	useEffect(() => {
		if (content) {
			setTitle(content.title || "");
			setBody(content.body || "");
        setContentType(content.content_type || "");
				setAnimeId(content.anime_id || "");
		}
	}, [content]);

	// Handle form submission
	// const handleSubmit = (e) => {
	// 	e.preventDefault();
	// 	const updatedContent = {contentType, title, body, animeId};
	// 	dispatch(patchContentAsync(id, updatedContent));
	// };

	// Handle delete button click
	const handleDelete = () => {
		dispatch(deleteContentAsync(id));

		// Redirect to content list page after deleting content
		navigate("/content");
	};

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
			<p className={styles.description}>{content.body}</p>
			{/* Anime Information */}
			<div className={styles.animeInfo}>
				<h2>Anime Information</h2>
				<p>
					<strong>Genre:</strong> {content.anime?.genre || "N/A"}
				</p>
				<p>
					<strong>Release Date:</strong> {content.anime?.release_date || "N/A"}
				</p>
				<p>
					<strong>Description:</strong> {content.anime?.description || "N/A"}
				</p>
			</div>
			{/* Image (if available) */}
			{content.anime?.image && (
				<img
					src={content.anime.image}
					alt={content.anime.title}
					className={styles.image}
				/>
			)}

			{/* Form to update content
			<form
				onSubmit={handleSubmit}
				className={styles.form}>
				<div className={styles.formGroup}>
					<label htmlFor="title">Title</label>
					<input
						type="text"
						id="title"
						value={title}
						onChange={(e) => setTitle(e.target.value)}
					/>
				</div>
				<div className={styles.formGroup}>
					<label htmlFor="content-type">Content-type</label>
					<input
						type="text"
						id="contentType"
						value={contentType}
						onChange={(e) => setContentType(e.target.value)}
					/>
				</div>
				<div className={styles.formGroup}>
					<label htmlFor="body">Body</label>
					<textarea
						id="body"
						value={body}
						onChange={(e) => setBody(e.target.value)}></textarea>
				</div>
				<button
					type="submit"
					className={`${styles.button} ${styles.updateButton}`}>
					Update Content
				</button>
			</form> */}
			{/* Delete button */}
			<button
				onClick={handleDelete}
				className={`${styles.button} ${styles.deleteButton}`}>
				Delete Content
			</button>
		</div>
	);
};

export default ContentDetail;

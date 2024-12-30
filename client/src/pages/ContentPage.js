// /src/pages/ContentPage.js
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	fetchContentAsync,
	submitContentAsync,
} from "../features/content/contentAction";
import { setCurrentPage } from "../features/content/contentSlice";
import { fetchAnimeListAsync } from "../features/anime/animeAction";
import Loader from "../components/Loader";
import Pagination from "../components/Pagination";
import { useNavigate } from "react-router-dom";
import styles from "../styles/ContentPage.module.css";

const ContentPage = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { contentList, loading, error, totalContent, currentPage } =
		useSelector((state) => state.content);
	const {
		animeList,
		loading: animeLoading,
		error: animeError,
	} = useSelector((state) => state.anime);
	const [animeId, setAnimeId] = useState("");
	const [contentType, setContentType] = useState("");
	const [title, setTitle] = useState("");
	const [body, setBody] = useState("");

	const itemsPerPage = 10;

	useEffect(() => {
		// Fetch content when the page loads
		dispatch(fetchContentAsync());
		dispatch(fetchAnimeListAsync());
	}, [dispatch]);

    console.log("Anime List:", animeList);
    console.log("ID", animeList.id);

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
	if (animeLoading) {
		return <Loader />;
	}

	if (error) {
		return <div className={styles.noContentMessage}>Error: {error}</div>;
	}
	if (animeError) {
		return <div className={styles.noContentMessage}>Error: {error}</div>;
	}

	if (!Array.isArray(contentList) || contentList.length === 0) {
		return <div className={styles.noContentMessage}>No content found.</div>;
	}

	const handleContentClick = (contentId) => {
		console.log(`Navigate to content ${contentId}`);
		navigate(`/content/${contentId}`);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const updatedContent = {
			animeId,
			contentType,
			title,
			body,
		};
		console.log("Submission data:", updatedContent);
		dispatch(submitContentAsync(updatedContent));
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
			{/* Submit Content Form */}
			<div className={styles.submitForm}>
				<h3>Submit Content</h3>
				<form onSubmit={handleSubmit}>
					<div className={styles.formGroup}>
						<label htmlFor="anime">Select Anime</label>
						<select
							id="anime"
							value={animeId}
							onChange={(e) => {
								console.log("Selected Anime ID:", e.target.value); // Add debugging log
								setAnimeId(e.target.value); // Ensure value is set
							}}
							required>
							<option value="">Select an anime</option>
							{animeList.map((anime) => (
								<option
									key={anime.id}
									value={anime.id}>
									{anime.title}
								</option>
							))}
						</select>
					</div>
					<div>
						<label>Title:</label>
						<input
							type="text"
							value={title}
							onChange={(e) => setTitle(e.target.value)}
							required
						/>
					</div>
					<div>
						<label>Content Type:</label>
						<input
							type="text"
							value={contentType}
							onChange={(e) => setContentType(e.target.value)}
							required
						/>
					</div>
					<div>
						<label>Content Description:</label>
						<textarea
							value={body}
							onChange={(e) => setBody(e.target.value)}
							required
						/>
					</div>
					<button type="submit">Submit</button>
				</form>
			</div>
		</div>
	);
};

export default ContentPage;

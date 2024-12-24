// /src/pages/AnimeDetail.js
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAnimeDetailsAsync } from "../features/anime/animeAction";
import { useParams } from "react-router-dom";
import placeholderImage from "../assets/placeholder-avatars/placeholder.jpg";
import Loader from "../components/Loader";
import { useNavigate } from "react-router-dom";
import styles from "../styles/AnimeDetail.module.css";

const AnimeDetail = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const dispatch = useDispatch();

	// Extract anime details and loading/error states
	const { animeDetails, loading, error } = useSelector((state) => state.anime);

	// Fetch anime details when the component mounts or id changes
	useEffect(() => {
		dispatch(fetchAnimeDetailsAsync(id));
	}, [dispatch, id]);

	// Show loading state while fetching anime details
	if (loading) {
		return <Loader />;
	}

	// Show error message if fetching failed
	if (error) {
		return <div className={styles.errorMessage}>Error: {error}</div>;
	}

	// If no anime data is found (possibly due to an issue with the API or missing details)
	if (!animeDetails) {
		return <div className={styles.errorMessage}>No anime found.</div>;
	}

	const handleEpisodeClick = (episodeId) => {
		console.log(`Navigate to episode ${episodeId}`);
		navigate(`/episode/${episodeId}`);
	};

	const handleContentClick = (contentId) => {
		console.log(`Navigate to content ${contentId}`);
		navigate(`/content/${contentId}`);
	};

	return (
		<div className={styles.container}>
			{/* Anime Title */}
			<h1 className={styles.title}>{animeDetails.title}</h1>

			{/* Anime Image */}
			<img
				src={animeDetails.image || placeholderImage}
				alt={animeDetails.title}
				className={styles.image}
			/>

			{/* Anime Description */}
			<p className={styles.description}>{animeDetails.description}</p>

			{/* Episodes Section */}
			<h3 className={styles.subTitle}>Episodes</h3>
			<div className={styles.episodeList}>
				{animeDetails.episodes.map((episode) => (
					<div
						key={episode.id}
						className={styles.contentItem}
						onClick={() => handleEpisodeClick(episode.id)}>
						{/* Title and Description */}
						<div className={styles.subText}>
							<h4>{episode.title}</h4>
							<h5>{episode.contentType}</h5>
							<p>{episode.description}</p>
						</div>
					</div>
				))}
			</div>

			{/* Episodes Section */}
			<h3 className={styles.subTitle}>Content</h3>
			<div className={styles.contentList}>
				{animeDetails.content.map((content) => (
					<div
						key={content.id}
						className={styles.contentItem}
						onClick={() => handleContentClick(content.id)}>
						{/* Title and Description */}
						<div className={styles.subText}>
							<h4>{content.title}</h4>
							<h5>{content.contentType}</h5>
							<p>{content.description}</p>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default AnimeDetail;

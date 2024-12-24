// /src/pages/EpisodeDetail.js
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEpisodeByIdAsync } from "../features/episode/episodeAction";
import { useParams } from "react-router-dom";
import { submitVote } from "../api/voteAPI";
import StarButton from "../components/StarButton";
import Loader from "../components/Loader";
import styles from "../styles/EpisodeDetail.module.css";

const EpisodeDetail = () => {
	const { id } = useParams();
	const dispatch = useDispatch();

	// Extract episode details, loading, and error states from Redux
	const { episodeDetails, loading, error } = useSelector(
		(state) => state.episode
	);

	const [votingMessage, setVotingMessage] = useState("");

	useEffect(() => {
		dispatch(fetchEpisodeByIdAsync(id));
	}, [dispatch, id]);

	// Show loading state while fetching episode details
	if (loading) {
		return <Loader />;
	}

	// Show error message if fetching failed
	if (error) {
		return <div className={styles.errorMessage}>Error: {error}</div>;
	}

	// Show message if episode is not found
	if (!episodeDetails) {
		return <div className={styles.errorMessage}>No episode found.</div>;
	}

	

	const handleVote = async (rating) => {
		try {
			const response = await submitVote(id, rating); // Call the API
			if (response.votes) {
				setVotingMessage(`Thanks for voting! Current votes: ${response.votes}`);
			} else {
				setVotingMessage("Failed to record your vote. Please try again.");
			}
		} catch (error) {
			setVotingMessage("An error occurred while voting. Please try again.");
			console.error("Voting error:", error);
		}

		// Clear the message after a delay
		setTimeout(() => setVotingMessage(""), 3000);
	};

	return (
		<div className={styles.container}>
			<h1 className={styles.title}>{episodeDetails.title}</h1>

			{episodeDetails.anime.image && (
				<img
					src={episodeDetails.anime.image}
					alt={episodeDetails.anime.title}
					className={styles.image}
				/>
			)}
			<p className={styles.description}>
				<strong>Description: </strong>
				{episodeDetails.description}
			</p>
			<p className={styles.description}>
				<strong>Episode Number: </strong> <light>Season 1 Episode </light>
				{episodeDetails.episode_number}
			</p>
			<p className={styles.description}>
				<strong>Rating: </strong>
				{episodeDetails.rating} / 5
			</p>
			<h2>Vote for this episode</h2>
			<div className={styles.voteSection}>
				{[1, 2, 3, 4, 5].map((rating) => (
					<StarButton
						key={rating}
						rating={rating}
						onClick={() => handleVote(rating)}
						className={styles.starButton}
					/>
				))}
			{/* Voting feedback */}
			{votingMessage && <p className={styles.votingMessage}>{votingMessage}</p>}
			</div>
		</div>
	);
};

export default EpisodeDetail;

// /src/pages/EpisodeDetail.js
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEpisodeByIdAsync } from "../features/episode/episodeAction";
import { setUser } from "../features/auth/authSlice";
import { useParams } from "react-router-dom";
import { submitVote } from "../api/voteAPI";
import Loader from "../components/Loader";
import styles from "../styles/EpisodeDetail.module.css";

const EpisodeDetail = () => {
	const { id } = useParams();
	const dispatch = useDispatch();

	// Extract episode details, loading, and error states from Redux
	const { episodeDetails, loading, error } = useSelector(
		(state) => state.episode
	);
	const { user: currentUser, token } = useSelector((state) => state.auth); // Access `user` and `token` from auth state

	const [votingMessage, setVotingMessage] = useState("");
	const [selectedRating, setSelectedRating] = useState(0);

	// Rehydrate user if token exists but user is null
	useEffect(() => {
		if (!currentUser && token) {
			// Decode and rehydrate user from token
			const storedUser = JSON.parse(localStorage.getItem("user"));
			if (storedUser) {
				dispatch(setUser({ user: storedUser, token }));
			}
		}
	}, [currentUser, token, dispatch]);

	// Fetch episode details on component mount
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

	// Handle voting logic
	const handleVote = async (rating) => {
		if (!currentUser || !currentUser.id) {
			setVotingMessage("You must be logged in to vote.");
			console.error("User is not logged in:", currentUser);
			return;
		}

		if (!episodeDetails || !episodeDetails.id || !episodeDetails.anime_id) {
			setVotingMessage("Episode details are incomplete.");
			console.error(
				"Episode details are missing or incomplete:",
				episodeDetails
			);
			return;
		}

		const payload = {
			user_id: currentUser.id,
			episode_id: episodeDetails.id,
			anime_id: episodeDetails.anime_id, // Include anime_id
			vote_value: rating,
		};

		console.log("Payload being sent to submitVote:", payload);

		try {
			const response = await submitVote(
				payload.user_id,
				payload.episode_id,
				payload.vote_value,
				payload.anime_id
			);
			if (response.votes) {
                setVotingMessage("Thanks for voting!");
			} else {
				setVotingMessage("Failed to record your vote. Please try again.");
			}
		} catch (error) {
			setVotingMessage("An error occurred while voting. Please try again.");
			console.error("Error submitting vote:", error);
		}

		setTimeout(() => setVotingMessage(""), 3000);
	};

	return (
		<div className={styles.container}>
			<h1 className={styles.title}>{episodeDetails.title}</h1>

			{/* Episode Image */}
			{episodeDetails.anime.image && (
				<img
					src={episodeDetails.anime.image}
					alt={episodeDetails.anime.title}
					className={styles.image}
				/>
			)}

			{/* Episode Details */}
			<p className={styles.description}>
				<strong>Description: </strong>
				{episodeDetails.description}
			</p>
			<p className={styles.description}>
				<strong>Episode Number: </strong> Season 1 Episode{" "}
				{episodeDetails.episode_number}
			</p>
			<p className={styles.description}>
				<strong>Rating: </strong>
				{episodeDetails.rating} / 5
			</p>

			{/* Voting Section */}
			<h2>Vote for this episode</h2>
			<div className={styles.voteSection}>
				{/* Render 5 stars dynamically */}
				{[...Array(5)].map((_, index) => (
					<span
						key={index}
						className={`fa fa-star ${
							index + 1 <= selectedRating ? styles.checked : styles.unchecked
						}`}
						onClick={() => {
							setSelectedRating(index + 1);
							handleVote(index + 1);
						}}></span>
				))}

				{/* Voting Feedback */}
                <div className={styles.voteMessageContainer}>
				{votingMessage && (
					<p
						className={`${styles.votingMessage} ${
							votingMessage.includes("Thanks") ? styles.success : styles.error
						}`}>
						{votingMessage}
					</p>
                )}
                </div>
			</div>
		</div>
	);
};

export default EpisodeDetail;

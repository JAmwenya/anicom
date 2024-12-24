// /src/pages/EpisodePage.js
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEpisodesAsync } from "../features/episode/episodeAction";
import { setCurrentPage } from "../features/episode/episodeSlice";
import EpisodeCard from "../components/EpisodeCard";
import Pagination from "../components/Pagination";
import Loader from "../components/Loader";
import { useNavigate } from "react-router-dom";
import styles from "../styles/EpisodePage.module.css";

const EpisodePage = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { episodeList, loading, error, totalEpisodes, currentPage } =
		useSelector((state) => state.episode);

	const itemsPerPage = 10;

	useEffect(() => {
		// Fetch episodes when the page loads
		dispatch(fetchEpisodesAsync());
	}, [dispatch]);

	const handlePageChange = (newPage) => {
		dispatch(setCurrentPage(newPage));
	};

	const startIndex = (currentPage - 1) * itemsPerPage;

	// Ensure episodeList is an array before attempting to slice
	const paginatedEpisodes = Array.isArray(episodeList)
		? episodeList.slice(startIndex, startIndex + itemsPerPage)
		: [];

	// Show loading state while fetching anime details
	if (loading) {
		return <Loader />;
	}

	if (error) {
		return <div className={styles.noContentMessage}>Error: {error}</div>;
	}

	if (!Array.isArray(episodeList) || episodeList.length === 0) {
		return <div className={styles.noContentMessage}>No episodes found.</div>;
	}

	const handleEpisodeClick = (episodeId) => {
		console.log(`Navigate to episode ${episodeId}`);
		navigate(`/episode/${episodeId}`);
	};

	return (
		<div className={styles.container}>
			{/* Title */}
			<h2 className={styles.heading}>Episode</h2>

			{/* Pagination */}
			<div className={styles.pagination}>
				<Pagination
					currentPage={currentPage}
					totalPages={Math.ceil(totalEpisodes / itemsPerPage)}
					onPageChange={handlePageChange}
				/>
			</div>

			{/* Episode List */}
			<div className={styles.episodeList}>
				{paginatedEpisodes.map((episode) => (
					<EpisodeCard
						key={episode.id}
						title={episode.title}
						animeImage={episode.anime?.image}
						onClick={() => handleEpisodeClick(episode.id)}
					/>
				))}
			</div>

			{/* Pagination */}
			<div className={styles.pagination}>
				<Pagination
					currentPage={currentPage}
					totalPages={Math.ceil(totalEpisodes / itemsPerPage)}
					onPageChange={handlePageChange}
				/>
			</div>
		</div>
	);
};

export default EpisodePage;

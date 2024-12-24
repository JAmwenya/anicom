// /src/pages/Home.js
import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAnimeListAsync } from "../features/anime/animeAction";
import AnimeCard from "../components/AnimeCard";
import Loader from "../components/Loader";
import { useNavigate } from "react-router-dom";
import styles from "../styles/Home.module.css";

const Home = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const animeList = useSelector((state) => state.anime.animeList);
	const loading = useSelector((state) => state.anime.loading);

	// Ref for the anime list container
	const animeListRef = useRef(null);

	useEffect(() => {
		dispatch(fetchAnimeListAsync());
	}, [dispatch]);

	// Scroll Logic
	const scrollLeft = () => {
		if (animeListRef.current) {
			animeListRef.current.scrollLeft -= 220; // Scroll left by card width + margin
		}
	};

	const scrollRight = () => {
		if (animeListRef.current) {
			animeListRef.current.scrollLeft += 220;
		}
	};

	const handleAnimeClick = (animeId) => {
		navigate(`/anime/${animeId}`);
	};

	// Show loading state while fetching anime
	if (loading) {
		return <Loader />;
	}

	return (
		<div className={styles.container}>
			{/* Hero Section */}
			<div className={styles.hero}>
				<h2 className={styles.heading}>Welcome to Anicom</h2>
				<p>Discover and learn about your favorite anime</p>
			</div>

			{/* Anime List Section */}
			<h3 className={styles.listHeading}>The Anime List</h3>
			<div style={{ position: "relative" }}>
				<button
					className={`${styles.scrollButton} ${styles.leftScroll}`}
					onClick={scrollLeft}>
					&#10094;
				</button>
				<div
					className={styles.animeList}
					ref={animeListRef}>
					{animeList && animeList.length > 0 ? (
						animeList.map((anime) => (
							<AnimeCard
								key={anime.id}
								title={anime.title}
								image={anime.image}
								onClick={() => handleAnimeClick(anime.id)}
							/>
						))
					) : (
						<p className={styles.noAnimeMessage}>No anime found</p>
					)}
				</div>
				<button
					className={`${styles.scrollButton} ${styles.rightScroll}`}
					onClick={scrollRight}>
					&#10095;
				</button>
			</div>
		</div>
	);
};

export default Home;

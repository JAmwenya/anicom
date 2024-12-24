// /src/hooks/useAnime.js
import { useDispatch, useSelector } from "react-redux";
import { setAnimeList, setSelectedAnime } from "../features/anime/animeSlice";
import { fetchAnimeList, fetchAnimeDetails } from "../features/anime/animeAPI";

const useAnime = () => {
	const dispatch = useDispatch();
	const animeList = useSelector((state) => state.anime.animeList);
	const selectedAnime = useSelector((state) => state.anime.selectedAnime);

	const fetchAnime = () => {
		fetchAnimeList(dispatch);
	};

	const fetchAnimeDetailsById = (animeId) => {
		fetchAnimeDetails(dispatch, animeId);
	};

	return {
		animeList,
		selectedAnime,
		fetchAnime,
		fetchAnimeDetailsById,
	};
};

export default useAnime;

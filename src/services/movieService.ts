import axios from "axios";
import type { Movie } from "../types/movie";

export interface MovieResponse {
  page: number;
  total_pages: number;
  results: Movie[];
}

const BASE_URL = "https://api.themoviedb.org/3";

export async function fetchMovies(
  query: string,
  page: number = 1
): Promise<MovieResponse> {
  const config = {
    params: { query, page },
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
    },
  };

  const { data } = await axios.get<MovieResponse>(
    `${BASE_URL}/search/movie`,
    config
  );
  return data;
}

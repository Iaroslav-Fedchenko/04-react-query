import axios from "axios";
import type { Movie } from "../types/movie";

const BASE_URL = "https://api.themoviedb.org/3";

interface TMDBResponse {
  results: Movie[];
}

export async function fetchMovies(query: string): Promise<Movie[]> {
  const config = {
    params: { query },
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
    },
  };

  try {
  
    const response = await axios.get<TMDBResponse>(`${BASE_URL}/search/movie`, config);
    return response.data.results;
  } catch (error) {
    console.error("Error fetching movies:", error);
    throw error;
  }
}

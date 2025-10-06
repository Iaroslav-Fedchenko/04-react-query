import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import toast, { Toaster } from "react-hot-toast";
import ReactPaginate from "react-paginate";
import css from "./App.module.css";

import SearchBar from "../SearchBar/SearchBar";
import MovieGrid from "../MovieGrid/MovieGrid";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import MovieModal from "../MovieModal/MovieModal";

import { fetchMovies, type MovieResponse } from "../../services/movieService";
import type { Movie } from "../../types/movie";

function App() {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const { data, isLoading, isError } = useQuery<MovieResponse, Error>({
    queryKey: ["movies", query, page],
    queryFn: () => fetchMovies(query, page),
    enabled: !!query,
    staleTime: 1000 * 60 * 5,
    retry: false,
    placeholderData: (previousData) => previousData,
  });

  useEffect(() => {
    if (data?.results && data.results.length === 0 && query.trim()) {
      toast.error("No movies found for your request.");
    }
  }, [data, query]);

  function handleSearch(newQuery: string) {
    if (!newQuery.trim()) {
      toast.error("Please enter your search query.");
      return;
    }
    setQuery(newQuery);
    setPage(1);
  }

  function handleSelect(movie: Movie) {
    setSelectedMovie(movie);
  }

  function handleCloseModal() {
    setSelectedMovie(null);
  }

  const totalPages = data?.total_pages ?? 0;

  return (
    <div className={css.app}>
      <SearchBar onSubmit={handleSearch} />

      {isLoading && <Loader />}
      {isError && <ErrorMessage />}

      {data?.results?.length ? (
        <>
          <MovieGrid movies={data.results} onSelect={handleSelect} />
          {totalPages > 1 && (
            <ReactPaginate
              pageCount={totalPages}
              pageRangeDisplayed={5}
              marginPagesDisplayed={1}
              onPageChange={({ selected }) => setPage(selected + 1)}
              forcePage={page - 1}
              containerClassName={css.pagination}
              activeClassName={css.active}
              nextLabel="→"
              previousLabel="←"
            />
          )}
        </>
      ) : null}

      {selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={handleCloseModal} />
      )}

      <Toaster position="top-right" />
    </div>
  );
}

export default App;

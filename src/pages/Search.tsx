import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import useDebounce from '../hooks/useDebounce';
import { getSearchMovies } from '../api/api';
import MovieCard from '../components/MovieCard';

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
}

const Search = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const searchTerm = queryParams.get('query') || '';
  const debouncedSearchTerm = useDebounce(searchTerm, 1000);

  useEffect(() => {
    const fetchMovies = async () => {
      if (debouncedSearchTerm) {
        const result = await getSearchMovies(debouncedSearchTerm);
        setMovies(result.results || []);
      } else {
        setMovies([]);
      }
    };

    fetchMovies();
  }, [debouncedSearchTerm]);

  return (
    <div className="bg-gradient-to-r from-gray-900 to-gray-800 min-h-screen py-24 px-4 sm:px-6 lg:px-8">
      <h2 className="text-4xl font-bold mb-8 text-center text-white">
        {searchTerm} 검색 결과
      </h2>
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {movies.map((movie) => (
          <Link to={`/movie-detail/${movie.id}`} key={movie.id}>
            <MovieCard
              title={movie.title}
              posterPath={movie.poster_path}
              voteAverage={movie.vote_average}
            />
          </Link>
        ))}
      </div>
      {!movies.length && (
        <h3 className="text-xl font-bold mb-8 text-center text-white">
          검색된 영화가 없습니다.
        </h3>
      )}
    </div>
  );
};

export default Search;

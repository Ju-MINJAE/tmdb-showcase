import React, { useEffect, useState } from 'react';
import { getPopularMovies, getTopRatedMovies } from '../api/api';
import MovieCard from '../components/MovieCard';
import MovieSwiper from '../components/MovieSwiper';
import { Link } from 'react-router-dom';

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
}

const MovieList: React.FC = () => {
  const [popularMovies, setPopularMovies] = useState<Movie[]>([]);
  const [topRatedMovies, setTopRatedMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const fetchPopularMovies = async () => {
      const popularMovieData = await getPopularMovies();
      setPopularMovies(popularMovieData);
    };
    const fetchNowplayMovies = async () => {
      const topRatedMovieData = await getTopRatedMovies();
      setTopRatedMovies(topRatedMovieData);
    };

    fetchPopularMovies();
    fetchNowplayMovies();
  }, []);

  return (
    <div className="bg-gradient-to-r from-gray-900 to-gray-800 min-h-screen py-24 px-4 sm:px-6 lg:px-8">
      <h2 className="text-4xl font-bold mb-8 text-center text-white">
        평점 높은 영화
      </h2>
      <MovieSwiper movies={topRatedMovies} />
      <hr className="mt-6" />
      <div className="bg-gradient-to-r from-gray-900 to-gray-800 min-h-screen py-6 px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold mb-8 text-center text-white">
          인기 영화 목록
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {popularMovies.map((movie) => (
            <Link to={`/movie-detail/${movie.id}`} key={movie.id}>
              <MovieCard
                title={movie.title}
                posterPath={movie.poster_path}
                voteAverage={movie.vote_average}
              />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieList;

import React from 'react';
import movieData from '../data/movieListData.json';
import MovieCard from './MovieCard';
import { Link } from 'react-router-dom';

const MovieList: React.FC = () => {
  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold mb-6 text-center">영화 목록</h2>
      <div className="flex flex-wrap justify-center gap-6">
        {movieData.results.map((movie) => (
          <Link key={movie.id} to="/movie-detail">
            <MovieCard
              title={movie.title}
              posterPath={movie.poster_path}
              voteAverage={movie.vote_average}
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MovieList;

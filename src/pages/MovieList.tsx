import React, { useEffect, useRef, useState } from 'react';
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
  const [page, setPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const observerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const fetchTopRatedMovies = async () => {
      const topRatedMovieData = await getTopRatedMovies();
      setTopRatedMovies(topRatedMovieData);
    };

    fetchTopRatedMovies();
  }, []);

  const fetchPopularMovies = async (page: number) => {
    setIsLoading(true);
    const popularMovieData = await getPopularMovies(page);
    setPopularMovies((prevMovies) => [...prevMovies, ...popularMovieData]);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchPopularMovies(page);
  }, [page]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isLoading) {
          setPage((prevPage) => prevPage + 1);
        }
      },
      { threshold: 1.0 }
    );

    if (observerRef.current) observer.observe(observerRef.current);

    return () => {
      if (observerRef.current) observer.unobserve(observerRef.current);
    };
  }, [isLoading]);

  return (
    <div className="bg-gradient-to-r from-gray-900 to-gray-800 min-h-screen py-24 px-4 sm:px-6 lg:px-8">
      <h2 className="text-4xl font-bold mb-8 text-center text-white">
        최고 평점 영화
      </h2>
      <MovieSwiper movies={topRatedMovies} />
      <hr className="mt-12" />
      <div className="bg-gradient-to-r from-gray-900 to-gray-800 min-h-screen py-6 px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold mb-8 text-center text-white">
          인기 영화 리스트
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
        <div ref={observerRef} className="h-10"></div>
        {isLoading && (
          <p className="text-center text-white text-2xl">로딩중....</p>
        )}
      </div>
    </div>
  );
};

export default MovieList;

import React from 'react';
import movieData from '../data/movieListData.json';
import MovieCard from './MovieCard';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, A11y, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

const MovieList: React.FC = () => {
  return (
    <div className="bg-gradient-to-r from-gray-900 to-gray-800 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <h2 className="text-4xl font-bold mb-8 text-center text-white">
        영화 목록
      </h2>
      <Swiper
        modules={[Navigation, Pagination, A11y, Autoplay]}
        spaceBetween={20}
        slidesPerView={1}
        loop
        navigation
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        breakpoints={{
          640: {
            slidesPerView: 2,
          },
          768: {
            slidesPerView: 3,
          },
          1024: {
            slidesPerView: 4,
          },
          1280: {
            slidesPerView: 5,
          },
        }}
        className="movie-swiper"
      >
        {movieData.results.map((movie) => (
          <SwiperSlide key={movie.id}>
            <Link to={`/movie-detail/${movie.id}`}>
              <MovieCard
                title={movie.title}
                posterPath={movie.poster_path}
                voteAverage={movie.vote_average}
              />
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default MovieList;

import React from 'react';
import { Link } from 'react-router-dom';
import { Star } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, A11y, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
}

interface MovieSwiperProps {
  movies: Movie[];
}

const MovieSwiper: React.FC<MovieSwiperProps> = ({ movies }) => {
  return (
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
    >
      {movies.map((movie) => (
        <SwiperSlide
          key={movie.id}
          className="transition-all duration-300 hover:scale-105 hover:shadow-2xl"
        >
          <Link to={`/movie-detail/${movie.id}`}>
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="w-full h-80 object-cover rounded-lg"
            />
            <div className="text-center mt-2 text-white">
              <p>{movie.title}</p>
              <div className="flex justify-center items-center">
                <Star
                  className="text-yellow-400 fill-yellow-400 mr-1"
                  size={16}
                />
                <span className="text-gray-300">
                  {movie.vote_average.toFixed(1)} / 10
                </span>
              </div>
            </div>
          </Link>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default MovieSwiper;

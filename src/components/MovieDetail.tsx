'use client';

import { useEffect, useState } from 'react';
import movieDetailData from '../data/movieDetailData.json';
import { Star, Calendar, Clock } from 'lucide-react';

const BASE_URL = 'https://image.tmdb.org/t/p/original';

export default function Component() {
  const [movieData, setMovieData] = useState<any>(null);

  useEffect(() => {
    const DetailData = {
      backdrop_path: movieDetailData.backdrop_path,
      title: movieDetailData.title,
      vote_average: movieDetailData.vote_average,
      genres: movieDetailData.genres,
      overview: movieDetailData.overview,
      tagline: movieDetailData.tagline,
      release_date: movieDetailData.release_date,
      runtime: movieDetailData.runtime,
      poster_path: movieDetailData.poster_path,
    };

    setMovieData(DetailData);
  }, []);

  if (!movieData)
    return (
      <div className="flex items-center justify-center h-screen">
        Loading...
      </div>
    );

  return (
    <div className="relative min-h-screen overflow-hidden bg-black text-white">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-30 blur-sm"
        style={{
          backgroundImage: `url(${BASE_URL}${movieData.backdrop_path})`,
          animation: 'slowPan 60s linear infinite alternate',
        }}
      />
      <div className="relative z-10 container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 text-center">
          {movieData.title} 상세정보
        </h1>
        <div className="bg-gray-900 bg-opacity-80 rounded-lg overflow-hidden shadow-2xl">
          <div className="md:flex">
            <div className="md:w-1/3 p-6">
              <img
                src={`${BASE_URL}${movieData.poster_path}`}
                alt={movieData.title}
                className="w-full h-auto object-cover rounded-lg shadow-lg"
              />
            </div>
            <div className="md:w-2/3 p-6">
              <h2 className="text-3xl font-bold mb-4">{movieData.title}</h2>
              <div className="flex items-center mb-4">
                <Star className="text-yellow-400 mr-2" />
                <span className="text-xl">
                  {movieData.vote_average.toFixed(1)}
                </span>
              </div>
              <p className="text-xl italic mb-6">
                &quot;{movieData.tagline}&quot;
              </p>
              <div className="mb-6">
                <h3 className="text-2xl font-semibold mb-2">장르</h3>
                <div className="flex flex-wrap gap-2">
                  {movieData.genres.map(
                    (genre: { name: string }, index: number) => (
                      <span
                        key={index}
                        className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm"
                      >
                        {genre.name}
                      </span>
                    )
                  )}
                </div>
              </div>
              <div className="mb-6">
                <h3 className="text-2xl font-semibold mb-2">줄거리</h3>
                <p className="text-gray-300">{movieData.overview}</p>
              </div>
              <div className="flex justify-between text-sm">
                <div className="flex items-center">
                  <Calendar className="mr-2" />
                  <span>개봉일: {movieData.release_date}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="mr-2" />
                  <span>상영 시간: {movieData.runtime}분</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

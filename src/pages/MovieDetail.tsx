import { useEffect, useState } from 'react';
import { getMovieDetails, getMovieCredits } from '../api/api';
import { Star, Calendar, Clock } from 'lucide-react';
import { useParams } from 'react-router-dom';
import Loading from '../components/Loading';

const BASE_URL = import.meta.env.VITE_TMDB_IMG_URL;

const MovieDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [movieData, setMovieData] = useState<any>(null);
  const [credits, setCredits] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      if (id) {
        setIsLoading(true);
        const data = await getMovieDetails(id);
        setMovieData(data);
        const creditsData = await getMovieCredits(id);
        setCredits(creditsData);
        setIsLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (isLoading) return <Loading loading={isLoading} />;

  return (
    <div className="py-20 relative min-h-screen overflow-hidden bg-black text-white">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-30 blur-sm"
        style={{
          backgroundImage: `url(${BASE_URL}${movieData.backdrop_path})`,
          animation: 'slowPan 60s linear infinite alternate',
        }}
      />
      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* <h1 className="text-4xl font-bold mb-8 text-center">
          {movieData.title} 상세정보
        </h1> */}
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
              <div className="flex justify-between mb-4">
                <h2 className="text-3xl font-bold">{movieData.title}</h2>
                <div className="flex">
                  <Star className="text-yellow-400 mr-2 fill-yellow-400" />
                  <span className="text-xl">
                    {movieData.vote_average.toFixed(1)}
                  </span>
                </div>
              </div>
              {movieData.tagline && (
                <p className="text-xl italic mb-6">
                  &quot;{movieData.tagline}&quot;
                </p>
              )}
              <div className="mb-6">
                <h3 className="text-2xl font-semibold mb-2">장르</h3>
                <div className="flex flex-wrap gap-2">
                  {movieData.genres.map(
                    (genre: { name: string }, index: number) => (
                      <span
                        key={index}
                        className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm border-2 border-white"
                      >
                        {genre.name}
                      </span>
                    )
                  )}
                </div>
              </div>
              {movieData.overview ? (
                <div className="mb-6">
                  <h3 className="text-2xl font-semibold mb-2">줄거리</h3>
                  <p className="text-gray-300">{movieData.overview}</p>
                </div>
              ) : (
                <div className="mb-6 text-2xl font-semibold">
                  작성된 줄거리가 없습니다.
                </div>
              )}
              <hr />
              <div className="flex justify-between text-sm mt-2">
                <div className="flex items-center">
                  <Calendar className="mr-2" />
                  <span>개봉일: {movieData.release_date}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="mr-2" />
                  <span>상영 시간: {movieData.runtime}분</span>
                </div>
              </div>
              {credits && credits.cast && (
                <div className="mt-8">
                  <h3 className="text-2xl font-semibold mb-4">주요 출연진</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-6 gap-4">
                    {credits.cast.slice(0, 6).map((actor: any) => (
                      <div
                        key={actor.id}
                        className="flex flex-col items-center"
                      >
                        <div className="w-24 h-24 mb-2 overflow-hidden rounded-full border-2 border-white">
                          <img
                            src={
                              actor.profile_path
                                ? `${BASE_URL}${actor.profile_path}`
                                : '/placeholder.svg?height=96&width=96'
                            }
                            alt={actor.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <span className="text-sm text-center font-medium">
                          {actor.name}
                        </span>
                        <span className="text-xs text-center text-gray-400">
                          {actor.character}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;

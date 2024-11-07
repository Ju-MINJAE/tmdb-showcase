import { Star } from 'lucide-react';

interface MovieCardProps {
  title: string;
  posterPath: string;
  voteAverage: number;
}

const BASE_URL = 'https://image.tmdb.org/t/p/w500';

const MovieCard: React.FC<MovieCardProps> = ({
  title,
  posterPath,
  voteAverage,
}) => {
  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl">
      <img
        src={`${BASE_URL}${posterPath}`}
        alt={title}
        className="w-full h-64 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-white mb-2 truncate">
          {title}
        </h3>
        <div className="flex items-center">
          <Star className="text-yellow-400 fill-yellow-400 mr-1" size={16} />
          <span className="text-sm text-gray-300">
            {voteAverage.toFixed(1)} / 10
          </span>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;

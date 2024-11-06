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
    <div className="w-40 bg-white rounded-lg shadow-md p-3 transform transition-transform duration-200 hover:scale-105">
      <img
        src={`${BASE_URL}${posterPath}`}
        alt={title}
        className="w-full h-52 object-cover rounded-md mb-3"
      />
      <h3 className="text-md font-semibold text-gray-800 mb-1">{title}</h3>
      <p className="text-xs text-gray-600">평점: {voteAverage} / 10</p>
    </div>
  );
};

export default MovieCard;

// import movieDetailData from '../data/movieDetailData.json';

// const BASE_URL = 'https://image.tmdb.org/t/p/w500';

// const MovieDetail = () => {
//   const { backdrop_path, poster_path, title, vote_average, genres, overview } =
//     movieDetailData;

//   return (
//     <div className="p-8 bg-gray-100 min-h-screen">
//       <div
//         className="w-full h-64 bg-cover bg-center mb-8 rounded-lg shadow-md"
//         style={{
//           backgroundImage: `url(${BASE_URL}${backdrop_path || poster_path})`,
//         }}
//       ></div>

//       <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-lg">
//         <h1 className="text-3xl font-bold mb-4">{title}</h1>
//         <p className="text-lg font-semibold text-yellow-500 mb-4">
//           평점: {vote_average} / 10
//         </p>

//         <div className="flex flex-wrap gap-2 mb-4">
//           {genres.map((genre) => (
//             <span
//               key={genre.id}
//               className="text-sm font-medium bg-gray-200 px-3 py-1 rounded-full"
//             >
//               {genre.name}
//             </span>
//           ))}
//         </div>

//         <p className="text-gray-700 text-base leading-relaxed">{overview}</p>
//       </div>
//     </div>
//   );
// };

// export default MovieDetail;

const MovieDetail = () => {
  return (
    <div className="container mx-auto p-4 md:p-8 border-2 border-gray-300">
      <h1 className="text-3xl font-bold mb-6 text-center border-b-2 border-gray-300">
        영화 상세정보
      </h1>

      <div className="overflow-hidden border-2 border-gray-300">
        <div className="p-0">
          <div className="md:flex">
            <div className="md:w-1/3 border-2 border-gray-300 p-4">이미지</div>
            <div className="md:w-2/3 p-6 border-2 border-gray-300">
              <h2 className="text-2xl font-bold mb-2 border-b-2 border-gray-300">
                영화제목
              </h2>
              <div className="flex items-center mb-4 border-b-2 border-gray-300">
                <span className="text-lg">평점</span>
              </div>
              <h3 className="text-xl font-semibold mb-2 border-b-2 border-gray-300">
                줄거리
              </h3>
              <p className="text-gray-700">줄거리 주저리주저리</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;

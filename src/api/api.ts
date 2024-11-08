import axios from 'axios';
const API_BASE_URL = import.meta.env.VITE_TMDB_BASE_URL;
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

export const getPopularMovies = async (page = 1) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/movie/popular`, {
      params: {
        api_key: API_KEY,
        language: 'ko-KR',
        page,
      },
    });
    return response.data.results;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getTopRatedMovies = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/movie/top_rated`, {
      params: {
        api_key: API_KEY,
        language: 'ko-KR',
        page: 1,
      },
    });
    return response.data.results;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getMovieDetails = async (movieId: string) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/movie/${movieId}`, {
      params: {
        api_key: API_KEY,
        language: 'ko-KR',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching movie details:', error);
    return null;
  }
};

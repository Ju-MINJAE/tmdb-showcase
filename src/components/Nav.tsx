import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, Search, User } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useDebounce from '../hooks/useDebounce';
import { getSearchMovies } from '../api/api';
import { RootState } from '../RTK/authStore';
import { logout } from '../RTK/authSlice';

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
  release_date: any;
}

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const debouncedSearchTerm = useDebounce(searchTerm, 1000);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchMovies = async () => {
      if (debouncedSearchTerm) {
        const result = await getSearchMovies(debouncedSearchTerm);
        setMovies(result.results || []);
      } else {
        setMovies([]);
      }
    };
    fetchMovies();
  }, [debouncedSearchTerm]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSearchClick = () => {
    if (!searchTerm) {
      return toast.warning('검색어를 입력하세요.');
    }
    navigate(`/search?query=${encodeURIComponent(searchTerm)}`);
    setSearchTerm('');
  };

  const handleLogout = () => {
    localStorage.clear();
    dispatch(logout());
    toast.success('로그아웃 되었습니다.');
    navigate('/');
    setIsDropdownOpen(false);
  };

  return (
    <nav className="relative">
      <ToastContainer
        className="mt-12"
        position="top-right"
        limit={1}
        autoClose={2000}
      />
      <div className="w-full fixed top-0 left-0 right-0 bg-[#2c3d60] mx-auto px-4 z-40 shadow-md">
        <div className="flex items-center justify-between">
          <div className="flex space-x-7 items-center">
            <Link to="/" className="flex items-center py-4 px-2">
              <span className="font-semibold text-white text-2xl">홈</span>
            </Link>
          </div>
          <div className="relative left-16">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-4 py-2 pr-10 rounded-full bg-white focus:outline-none focus:ring-2 focus:ring-blue-300 w-64 text-gray-800 placeholder-gray-500"
              placeholder="영화 검색"
            />
            <button onClick={handleSearchClick}>
              <Search
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
            </button>
          </div>
          <div className="hidden md:flex items-center space-x-1">
            {isAuthenticated ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center space-x-2 py-2 px-4 text-white font-semibold hover:text-gray-200 hover:bg-[#435983] rounded-md transition duration-300"
                >
                  <User className="w-8 h-8 p-1 bg-gray-300 rounded-full text-gray-600" />
                </button>
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-50">
                    <Link
                      to="/like"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      관심목록
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      로그아웃
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link
                  to="/signup"
                  className="py-2 px-4 text-white font-semibold hover:text-gray-200 hover:bg-[#435983] rounded-md transition duration-300"
                >
                  회원가입
                </Link>
                <Link
                  to="/signin"
                  className="py-2 px-4 text-white font-semibold hover:text-gray-200 hover:bg-[#435983] rounded-md transition duration-300"
                >
                  로그인
                </Link>
              </>
            )}
          </div>

          <div className="md:hidden flex items-center">
            <button
              className="outline-none mobile-menu-button z-50"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? (
                <X className="h-6 w-6 text-white" />
              ) : (
                <Menu className="h-6 w-6 text-white" />
              )}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden fixed inset-0 bg-[#2c3d60] pt-16 h-[180px] z-30">
          <div className="flex flex-col items-center">
            {isAuthenticated ? (
              <>
                <Link
                  to="/mypage"
                  className="w-full text-center py-4 text-white font-semibold hover:bg-[#435983] transition duration-300"
                  onClick={() => setIsOpen(false)}
                >
                  마이 페이지
                </Link>
                <Link
                  to="/like"
                  className="w-full text-center py-4 text-white font-semibold hover:bg-[#435983] transition duration-300"
                  onClick={() => setIsOpen(false)}
                >
                  관심목록
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsOpen(false);
                  }}
                  className="w-full text-center py-4 text-white font-semibold hover:bg-[#435983] transition duration-300"
                >
                  로그아웃
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/signup"
                  className="w-full text-center py-4 text-white font-semibold hover:bg-[#435983] transition duration-300"
                  onClick={() => setIsOpen(false)}
                >
                  회원가입
                </Link>
                <Link
                  to="/signin"
                  className="w-full text-center py-4 text-white font-semibold hover:bg-[#435983] transition duration-300"
                  onClick={() => setIsOpen(false)}
                >
                  로그인
                </Link>
              </>
            )}
          </div>
        </div>
      )}

      {movies.length > 0 && (
        <div className="absolute top-16 left-0 right-0 mt-1 mx-4 bg-white shadow-lg rounded-md z-50 max-h-96 overflow-y-auto">
          <ul className="py-2">
            {movies.map((movie) => (
              <li key={movie.id} className="px-4 py-2 hover:bg-gray-100">
                <Link
                  to={`/movie-detail/${movie.id}`}
                  onClick={() => setSearchTerm('')}
                  className="flex items-center space-x-4"
                >
                  {movie.poster_path && (
                    <img
                      src={`https://image.tmdb.org/t/p/w92${movie.poster_path}`}
                      alt={movie.title}
                      className="w-12 h-18 object-cover rounded"
                    />
                  )}
                  <div>
                    <p className="font-semibold text-gray-800">{movie.title}</p>
                    <p className="text-sm text-gray-600">
                      {movie.release_date?.split('-')[0]}
                    </p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Nav;

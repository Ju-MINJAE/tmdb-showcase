import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

export default function Nav() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="relative">
      <div className="w-full fixed top-0 left-0 right-0 bg-white mx-auto px-4 z-40">
        <div className="flex justify-between">
          <div className="flex space-x-7">
            <div>
              <Link to="/" className="flex items-center py-4 px-2">
                <span className="font-semibold text-gray-500 text-lg">홈</span>
              </Link>
            </div>
            <div className="hidden md:flex items-center space-x-1">
              <Link
                to="/signup"
                className="py-4 px-2 text-gray-500 font-semibold hover:text-gray-900 hover:scale-110 transition duration-300"
              >
                회원가입
              </Link>
              <Link
                to="/signin"
                className="py-4 px-2 text-gray-500 font-semibold hover:text-gray-900 hover:scale-110 transition duration-300"
              >
                로그인
              </Link>
            </div>
          </div>

          <div className="md:hidden flex items-center">
            <button
              className="outline-none mobile-menu-button"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? (
                <X className="h-6 w-6 text-gray-500" />
              ) : (
                <Menu className="h-6 w-6 text-gray-500" />
              )}
            </button>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden z-40">
          <Link
            to="/signup"
            className="block py-2 px-4 text-sm hover:bg-green-500 hover:text-white transition duration-300"
          >
            회원가입
          </Link>
          <Link
            to="/signin"
            className="block py-2 px-4 text-sm hover:bg-green-500 hover:text-white transition duration-300"
          >
            로그인
          </Link>
        </div>
      )}
    </nav>
  );
}

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

export default function Nav() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <nav className="relative">
      <div className="w-full fixed top-0 left-0 right-0 bg-[#2c3d60] mx-auto px-4 z-40 shadow-md">
        <div className="flex justify-between items-center">
          <div className="flex space-x-7">
            <div>
              <Link to="/" className="flex items-center py-4 px-2">
                <span className="font-semibold text-white text-lg">홈</span>
              </Link>
            </div>
            <div className="hidden md:flex items-center space-x-1">
              <Link
                to="/signup"
                className="py-4 px-2 text-white font-semibold hover:text-gray-200 hover:scale-110 transition duration-300"
              >
                회원가입
              </Link>
              <Link
                to="/signin"
                className="py-4 px-2 text-white font-semibold hover:text-gray-200 hover:scale-110 transition duration-300"
              >
                로그인
              </Link>
            </div>
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
          </div>
        </div>
      )}
    </nav>
  );
}

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import supabase from '../utils/supabase';
import { Eye, EyeOff } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { login } from '../RTK/authSlice';

const SignIn = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const signIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError('로그인 정보가 올바르지 않습니다.');
      return;
    }
    if (data?.user) {
      const nickname = data.user.user_metadata?.nickname ?? '사용자';

      dispatch(
        login({
          email: data.user.email ?? '',
          nickname,
        })
      );
      navigate('/');
    }
  };

  return (
    <div className="w-full mx-auto md:p-8 flex justify-center items-center min-h-screen bg-[#121a29]">
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-center text-gray-800">
            로그인
          </h1>
        </div>
        <div>
          <form onSubmit={signIn}>
            <div className="space-y-4">
              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  이메일
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  required
                  autoComplete="off"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  비밀번호
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  <button
                    type="button"
                    className="absolute right-0 top-0 h-full px-3 py-2 text-gray-600 hover:text-gray-900"
                    onClick={togglePasswordVisibility}
                    aria-label={
                      showPassword ? '비밀번호 숨기기' : '비밀번호 보기'
                    }
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>
            </div>
            {error && <p className="mt-4 text-sm text-red-600">{error}</p>}
            <button
              className="w-full mt-6 px-4 py-2 bg-[#28344a] text-white font-semibold rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2"
              type="submit"
            >
              로그인
            </button>
          </form>
        </div>
        <div className="mt-6 flex flex-col space-y-2 text-center text-sm">
          <Link to="/forgot-password" className="text-blue-600 hover:underline">
            비밀번호를 잊으셨나요?
          </Link>
          <div>
            계정이 없으신가요?{' '}
            <Link to="/signup" className="text-blue-600 hover:underline">
              회원가입
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;

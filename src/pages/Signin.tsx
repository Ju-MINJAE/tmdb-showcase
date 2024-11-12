import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import supabase from '../utils/supabase';
import Input from '../components/Input';
import PasswordInput from '../components/PasswordInput';
import { useDispatch } from 'react-redux';
import { login } from '../RTK/authSlice';

const SignIn = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const dispatch = useDispatch();

  const showError = (message: string) => {
    setError(message);
  };

  const signIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      showError('로그인 정보가 올바르지 않습니다.');
      return;
    }
    if (data?.session) {
      const nickname = data.user.user_metadata?.nickname ?? '사용자';
      const userData = {
        email: data.user.email ?? '',
        nickname,
      };
      dispatch(login(userData));
      localStorage.setItem('authUser', JSON.stringify(userData));
    }
  };

  const signInWithKakao = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'kakao',
    });

    if (error) {
      console.error('Kakao 로그인 오류:', error.message);
      return;
    }
  };

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' && session) {
        const userData = {
          email: session.user.email ?? '',
          nickname: session.user.user_metadata?.preferred_username ?? '사용자',
        };

        dispatch(login(userData));
        localStorage.setItem('authUser', JSON.stringify(userData));
        localStorage.setItem(
          'auth-token',
          JSON.stringify(session.access_token)
        );
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [dispatch]);

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
              <Input
                id="email"
                label="이메일"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <PasswordInput
                id="password"
                label="비밀번호"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={error}
              />
            </div>
            {error && <p className="mt-4 text-sm text-red-600">{error}</p>}
            <button
              className="w-full mt-6 px-4 py-2 bg-[#28344a] text-white font-semibold rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2"
              type="submit"
            >
              로그인
            </button>
          </form>
          <button
            onClick={signInWithKakao}
            className="w-full mt-4 px-4 py-2 bg-yellow-400 text-black font-semibold rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2"
          >
            카카오 로그인
          </button>
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

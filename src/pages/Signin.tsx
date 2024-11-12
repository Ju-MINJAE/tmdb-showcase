import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import supabase from '../utils/supabase';
import Input from '../components/Input';
import PasswordInput from '../components/PasswordInput';
import { useAuth } from '../contexts/AuthContext';

const SignIn = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();
  const { login } = useAuth();

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
      const user = {
        email: data.user.email ?? '',
        nickname: data.user.user_metadata?.nickname ?? '사용자',
      };
      login(user);
    }
    navigate('/');
  };

  const signInWithKakao = async (e: React.MouseEvent) => {
    e.preventDefault();

    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'kakao',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) {
      showError('카카오 로그인에 실패했습니다.');
      console.error('Kakao login error:', error);
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

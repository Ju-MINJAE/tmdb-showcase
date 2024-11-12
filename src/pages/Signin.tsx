import { useForm } from 'react-hook-form';
import { SignInFormData, signInSchema } from '../shemas/signinSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import supabase from '../utils/supabase';
import Input from '../components/Input';
import PasswordInput from '../components/PasswordInput';

const SignIn = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    reset,
  } = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: SignInFormData) => {
    try {
      const { data: authData, error } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });

      if (error) {
        setError('root', {
          type: 'server',
          message: '로그인 정보가 올바르지 않습니다.',
        });
        return;
      }

      if (authData?.session) {
        const user = {
          email: authData.user.email ?? '',
          nickname: authData.user.user_metadata?.nickname ?? '사용자',
          id: authData?.user.id,
        };
        login(user);
        reset();
        navigate('/');
      }
    } catch (error) {
      setError('root', {
        type: 'server',
        message: '로그인 중 오류가 발생했습니다.',
      });
    }
  };

  const signInWithKakao = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'kakao',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (error) {
        setError('root', {
          type: 'server',
          message: '카카오 로그인에 실패했습니다.',
        });
        console.error('Kakao login error:', error);
      }
    } catch (error) {
      setError('root', {
        type: 'server',
        message: '카카오 로그인 중 오류가 발생했습니다.',
      });
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

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="space-y-4">
            <Input
              id="email"
              label="이메일"
              type="email"
              error={errors.email?.message}
              {...register('email')}
            />
            <PasswordInput
              id="password"
              label="비밀번호"
              error={errors.password?.message}
              {...register('password')}
            />
          </div>

          {errors.root && (
            <p className="mt-4 text-sm text-red-600" role="alert">
              {errors.root.message}
            </p>
          )}

          <button
            className="w-full mt-6 px-4 py-2 bg-[#28344a] text-white font-semibold rounded-md shadow-sm 
              focus:outline-none focus:ring-2 focus:ring-offset-2 
              disabled:opacity-50 disabled:cursor-not-allowed
              hover:bg-[#1f2937] transition-colors"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? '로그인 중...' : '로그인'}
          </button>
        </form>

        <button
          onClick={signInWithKakao}
          className="w-full mt-4 px-4 py-2 bg-yellow-400 text-black font-semibold rounded-md shadow-sm 
            focus:outline-none focus:ring-2 focus:ring-offset-2 
            hover:bg-yellow-500 transition-colors
            disabled:opacity-50 disabled:cursor-not-allowed"
        >
          카카오 로그인
        </button>

        <div className="mt-6 flex flex-col space-y-2 text-center text-sm">
          <Link
            to="/forgot-password"
            className="text-blue-600 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
          >
            비밀번호를 잊으셨나요?
          </Link>
          <div>
            계정이 없으신가요?{' '}
            <Link
              to="/signup"
              className="text-blue-600 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
            >
              회원가입
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;

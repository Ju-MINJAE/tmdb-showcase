import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signUpSchema, SignUpFormData } from '../shemas/signupSchema';
import { Link, useNavigate } from 'react-router-dom';
import supabase from '../utils/supabase';
import PasswordInput from '../components/PasswordInput';
import Input from '../components/Input';

const Signup = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (data: SignUpFormData) => {
    try {
      const { error } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: {
            display_name: data.name,
            nickname: data.name,
          },
        },
      });

      if (error) {
        setError('root', {
          type: 'server',
          message: error.message,
        });
        return;
      }

      navigate('/signin');
    } catch (error) {
      setError('root', {
        type: 'server',
        message: '회원가입 중 오류가 발생했습니다.',
      });
    }
  };

  return (
    <div className="w-full mx-auto md:p-8 flex justify-center items-center min-h-screen bg-[#121a29]">
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-center text-gray-800">
            회원가입
          </h1>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="space-y-4">
            <div>
              <Input
                id="name"
                label="이름"
                type="text"
                error={errors.name?.message}
                {...register('name')}
              />
            </div>

            <div>
              <Input
                id="email"
                label="이메일"
                type="email"
                error={errors.email?.message}
                {...register('email')}
              />
            </div>

            <div>
              <PasswordInput
                id="password"
                label="비밀번호"
                error={errors.password?.message}
                {...register('password')}
              />
            </div>

            <div>
              <PasswordInput
                id="confirmPassword"
                label="비밀번호 확인"
                error={errors.confirmPassword?.message}
                {...register('confirmPassword')}
              />
            </div>
          </div>

          {errors.root && (
            <p className="mt-4 text-sm text-red-600">{errors.root.message}</p>
          )}

          <button
            className="w-full mt-6 px-4 py-2 bg-[#28344a] text-white font-semibold rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? '처리중...' : '회원가입'}
          </button>
        </form>

        <div className="mt-6 flex flex-col space-y-2 text-center text-sm">
          <Link to="/forgot-password" className="text-blue-600 hover:underline">
            비밀번호를 잊으셨나요?
          </Link>
          <div>
            이미 계정이 있으신가요?{' '}
            <Link to="/signin" className="text-blue-600 hover:underline">
              로그인
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;

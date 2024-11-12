import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import supabase from '../utils/supabase';
import { useAuth } from '../contexts/AuthContext';

const AuthCallback = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  useEffect(() => {
    const handleAuthCallback = async () => {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();

      if (error) {
        console.error('Auth callback error:', error);
        navigate('/signin');
        return;
      }

      if (session?.user) {
        console.log('User data:', session.user);
        console.log('User metadata:', session.user.user_metadata);

        const user = {
          email: session.user.email ?? '',
          nickname: session.user.user_metadata?.user_name ?? '사용자',
        };
        login(user);
        navigate('/');
      }
    };

    handleAuthCallback();
  }, [navigate, login]);

  return <div>로그인 처리중...</div>;
};

export default AuthCallback;

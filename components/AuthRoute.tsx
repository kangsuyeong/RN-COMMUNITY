import useAuth from '@/hooks/queries/useAuth';
import { router, useFocusEffect } from 'expo-router';
import { ReactNode } from 'react';

interface AuthRouteProps {
  children: ReactNode;
}

function AuthRoute({ children }: AuthRouteProps) {
  const { auth } = useAuth();
  useFocusEffect(() => {
    console.log('auth.id', auth.id);
    if (!auth.id) {
      router.replace('/auth');
    }
  });
  return <>{children}</>;
}

export default AuthRoute;

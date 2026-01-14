import { getMe, postLogin, postSignup } from '@/api/auth';
import queryClient from '@/api/queryClient';
import { queryKey } from '@/constants';
import { removeHeader, setHeader } from '@/utils/header';
import {
  deleteSecureStore,
  getSecureStore,
  saveSecureStore,
} from '@/utils/secureStore';
import { useMutation, useQuery } from '@tanstack/react-query';
import { router } from 'expo-router';
import { useEffect } from 'react';

function useGetMe() {
  const { data, isError, isSuccess } = useQuery({
    queryFn: getMe,
    queryKey: [queryKey.AUTH, queryKey.GET_ME],
  });

  useEffect(() => {
    (async () => {
      if (isSuccess) {
        const accessToken = await getSecureStore('accessToken');
        setHeader('Authorization', `Bearer ${accessToken}`);
      }
    })();
  }, [isSuccess]);

  useEffect(() => {
    if (isError) {
      removeHeader('Authorization');
      deleteSecureStore('accessToken');
    }
  }, [isError]);

  return { data };
}

function useLogin() {
  return useMutation({
    mutationFn: postLogin,
    onSuccess: async ({ accessToken }) => {
      setHeader('Authorization', `Bearer ${accessToken}`);
      await saveSecureStore('accessToken', accessToken);
      await queryClient.fetchQuery({
        queryKey: [queryKey.AUTH, queryKey.GET_ME],
      });
      router.replace('/');
    },
    onError: (err) => console.log('로그인 에러:', err),
  });
}

function useSignup() {
  return useMutation({
    mutationFn: postSignup,
    onSuccess: () => router.replace('/auth/login'),
    onError: () => {
      //
    },
  });
}

function useAuth() {
  const { data } = useGetMe();
  const loginMutation = useLogin();
  const signupMutation = useSignup();

  const logout = () => {
    console.log('클릭은되는거지?');
    removeHeader('Authorization');
    deleteSecureStore('accessToken');
    queryClient.resetQueries({ queryKey: [queryKey.AUTH] });
  };

  return {
    auth: {
      id: data?.id || '',
      nickname: data?.nickname || '',
      imageUri: data?.imageUri || '',
      introduce: data?.introduce || '',
    },
    loginMutation,
    signupMutation,
    logout,
  };
}

export default useAuth;

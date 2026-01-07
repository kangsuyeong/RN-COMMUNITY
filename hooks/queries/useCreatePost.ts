import { createPost } from '@/api/post';
import queryClient from '@/api/queryClient';
import { queryKey } from '@/constants';
import { useMutation } from '@tanstack/react-query';
import { router } from 'expo-router';

function useCreatePost() {
  return useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      router.replace('/');
      queryClient.invalidateQueries({
        queryKey: [queryKey.POST, queryKey.GET_POSTS],
      });
    },
  });
}

export default useCreatePost;

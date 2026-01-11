import { likePost } from '@/api/post';
import queryClient from '@/api/queryClient';
import { queryKey } from '@/constants';
import { useMutation } from '@tanstack/react-query';

function useLikePost() {
  return useMutation({
    mutationFn: likePost,
    onSuccess: (postId) => {
      queryClient.invalidateQueries({
        queryKey: [queryKey.POST, queryKey.GET_POSTS],
      });
      queryClient.invalidateQueries({
        queryKey: [queryKey.POST, queryKey.GET_POST, postId],
      });
    },
  });
}

export default useLikePost;

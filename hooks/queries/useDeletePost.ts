import { deletePost } from '@/api/post';
import queryClient from '@/api/queryClient';
import { queryKey } from '@/constants';
import { useMutation } from '@tanstack/react-query';

function useDeletePosts() {
  return useMutation({
    mutationFn: deletePost,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [queryKey.POST, queryKey.GET_POSTS],
      });
    },
  });
}

export default useDeletePosts;

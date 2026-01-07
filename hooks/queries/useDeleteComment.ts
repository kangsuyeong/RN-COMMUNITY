import { deleteComment } from '@/api/comment';
import queryClient from '@/api/queryClient';
import { queryKey } from '@/constants';
import { useMutation } from '@tanstack/react-query';

function useDeleteComment() {
  return useMutation({
    mutationFn: deleteComment,
    onSuccess: (postId: number) => {
      queryClient.invalidateQueries({
        queryKey: [queryKey.POST, queryKey.GET_POST, postId],
      });
    },
  });
}

export default useDeleteComment;

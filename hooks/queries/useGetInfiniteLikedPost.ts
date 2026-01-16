import { getLikedPosts } from '@/api/post';
import { queryKey } from '@/constants';
import { useInfiniteQuery } from '@tanstack/react-query';

function useGetInfiniteLikedPosts() {
  return useInfiniteQuery({
    queryFn: ({ pageParam }) => getLikedPosts(pageParam),
    queryKey: [queryKey.POST, queryKey.GET_POSTS, queryKey.GET_LIKED_POSTS],
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const lastPost = lastPage[lastPage.length - 1];
      return lastPost ? allPages.length + 1 : undefined;
    },
  });
}

export default useGetInfiniteLikedPosts;

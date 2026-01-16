import { getMyPosts } from '@/api/post';
import { queryKey } from '@/constants';
import { useInfiniteQuery } from '@tanstack/react-query';

function useGetInfiniteMyPosts() {
  return useInfiniteQuery({
    queryFn: ({ pageParam }) => getMyPosts(pageParam),
    queryKey: [queryKey.POST, queryKey.GET_POSTS, queryKey.GET_MY_POSTS],
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const lastPost = lastPage[lastPage.length - 1];
      return lastPost ? allPages.length + 1 : undefined;
    },
  });
}

export default useGetInfiniteMyPosts;

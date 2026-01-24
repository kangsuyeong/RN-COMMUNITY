import { getSearchPosts } from '@/api/post';
import { queryKey } from '@/constants';
import { useInfiniteQuery } from '@tanstack/react-query';

function useGetInfiniteSearchPosts(query: string) {
  return useInfiniteQuery({
    queryFn: ({ pageParam }) => getSearchPosts(pageParam, query),
    queryKey: [
      queryKey.POST,
      queryKey.GET_POSTS,
      queryKey.GET_SEARCH_POST,
      query,
    ],
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const lastPost = lastPage[lastPage.length - 1];
      return lastPost ? allPages.length + 1 : undefined;
    },
  });
}

export default useGetInfiniteSearchPosts;

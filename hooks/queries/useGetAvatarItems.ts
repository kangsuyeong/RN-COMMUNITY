import {
  getBottoms,
  getFaces,
  getHands,
  getHats,
  getSkins,
  getTops,
} from '@/api/avatar';
import { queryKey } from '@/constants';
import { useQueries } from '@tanstack/react-query';

function useGetAvatarItems() {
  const [
    hatsQuery,
    facesQuery,
    topsQuery,
    bottomsQuery,
    handsQuery,
    skinsQuery,
  ] = useQueries({
    queries: [
      {
        queryFn: getHats,
        queryKey: [queryKey.AVATAR, 'hats'],
      },
      {
        queryFn: getFaces,
        queryKey: [queryKey.AVATAR, 'faces'],
      },
      {
        queryFn: getTops,
        queryKey: [queryKey.AVATAR, 'tops'],
      },
      {
        queryFn: getBottoms,
        queryKey: [queryKey.AVATAR, 'bottoms'],
      },
      {
        queryFn: getHands,
        queryKey: [queryKey.AVATAR, 'hands'],
      },
      {
        queryFn: getSkins,
        queryKey: [queryKey.AVATAR, 'skins'],
      },
    ],
  });

  return {
    hats: hatsQuery.data || [],
    faces: facesQuery.data || [],
    tops: topsQuery.data || [],
    bottoms: bottomsQuery.data || [],
    hands: handsQuery.data || [],
    skins: skinsQuery.data || [],
  };
}

export default useGetAvatarItems;

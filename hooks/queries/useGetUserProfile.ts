import { getUserProfile } from '@/api/auth';
import { queryKey } from '@/constants';
import { useQuery } from '@tanstack/react-query';

function useGetUserProfile(id: number) {
  return useQuery({
    queryFn: () => getUserProfile(id),
    queryKey: [queryKey.AUTH, queryKey.GET_USER_PROFILE, id],
  });
}

export default useGetUserProfile;

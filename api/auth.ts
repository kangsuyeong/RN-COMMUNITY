import axiosInstance from '@/api/axios';
import { Profile } from '@/types';
import { getSecureStore } from '@/utils/secureStore';

type requestUser = {
  email: string;
  password: string;
};

async function postSignup(body: requestUser): Promise<void> {
  const { data } = await axiosInstance.post('/auth/signup', body);

  return data;
}

async function postLogin(
  body: requestUser & { expoPushToken?: string },
): Promise<{ accessToken: string }> {
  const { data } = await axiosInstance.post('/auth/signin', body);
  return data;
}
async function getMe(): Promise<Profile> {
  const accessToken = await getSecureStore('accessToken');

  const { data } = await axiosInstance.get('/auth/me', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return data;
}

async function getUserProfile(id: Number): Promise<Profile> {
  const { data } = await axiosInstance.get(`/auth/${id}`);

  return data;
}

async function editProfile(body: Partial<Profile>): Promise<Profile> {
  const { data } = await axiosInstance.patch('/auth/me', body);

  return data;
}

export { editProfile, getMe, getUserProfile, postLogin, postSignup };

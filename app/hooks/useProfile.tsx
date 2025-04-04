import { UserProfile } from '@/app/types/user';
import { useFetchAuth } from '@/app/hooks/useFetchData';

export const useProfile = () => {
  return useFetchAuth<UserProfile>(['profile'], '/user/me');
};

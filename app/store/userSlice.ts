import { StateCreator } from 'zustand';
import { UserState } from '~/utils/interfaces';
import { UpdateUserKey } from '~/types/GlobalState';

export const createUserSlice: StateCreator<UserState, [], [], UserState> = (set) => ({
  user: {
    firstname: '',
    lastname: '',
    bio: '',
    username: '',
    timezone: '',
    onboarding: false,
  },
  updateUser: (data: Record<UpdateUserKey, string>) => set((state) => ({ user: { ...state.user, ...data } })),
});

/* eslint-disable import/prefer-default-export */
import { create } from 'zustand';

export type User = {
  firstname: string;
  lastname: string;
  bio: string;
  username: string;
  timezone: string;
  onboarding: boolean;
};

type updateUserKey = 'firstname' | 'lastname' | 'bio' | 'username' | 'timezone';

export type UserState = {
  user: User;
  updateUser: (data: Record<updateUserKey, string>) => void;
};

export const createUserSlice = create<UserState>()((set) => ({
  user: {
    firstname: '',
    lastname: '',
    bio: '',
    username: '',
    timezone: '',
    onboarding: false,
  },
  updateUser: (data: Record<updateUserKey, string>) =>
    set((state) => ({ user: { ...state.user, ...data } })),
}));

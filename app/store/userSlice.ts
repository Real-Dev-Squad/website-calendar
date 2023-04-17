/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable no-unused-vars */
/* eslint-disable import/prefer-default-export */

import { StateCreator } from 'zustand';
import { EventState, UserState } from '~/utils/interfaces';
import { UpdateUserKey } from '~/types/GlobalState';

export const createUserSlice: StateCreator<EventState & UserState, [], [], UserState> = (set) => ({
  user: {
    firstname: '',
    lastname: '',
    bio: '',
    username: '',
    timezone: '',
    onboarding: false,
  },
  updateUser: (data: Record<UpdateUserKey, string>) =>
    set((state) => ({ user: { ...state.user, ...data } })),
});

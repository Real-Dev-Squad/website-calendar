/* eslint-disable import/prefer-default-export */

import { create, StateCreator } from 'zustand';
import { CalEvent } from '~/utils/interfaces';
import { UserState } from './userSlice';

export type EventState = {
  events: CalEvent[];
  addEvent: (event: CalEvent) => void;
  removeEvent: (event: CalEvent) => void;
};

const createBearSlice: StateCreator<EventState & UserState, [], [], EventState> = (set) => ({
  events: [],
  addEvent: (event) => set((state) => ({ events: [...state.events, event] })),
  removeEvent: (id) =>
    set((state) => ({ events: state.events.filter((event) => event.id !== id) })),
});

type updateUserKey = 'firstname' | 'lastname' | 'bio' | 'username' | 'timezone';

const createFishSlice: StateCreator<EventState & UserState, [], [], UserState> = (set) => ({
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
});

export const useBoundStore = create<EventState & UserState>()((...a) => ({
  ...createBearSlice(...a),
  ...createFishSlice(...a),
}));

import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { createEventSlice } from './eventSlice';
import { createUserSlice } from './userSlice';
import { EventState, UserState } from '~/utils/interfaces';

export const useStore = create<EventState & UserState>()(
  devtools((...a) => ({
    ...createEventSlice(...a),
    ...createUserSlice(...a),
  })),
);

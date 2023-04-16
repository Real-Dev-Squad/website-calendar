/* eslint-disable import/prefer-default-export */

import { create } from 'zustand';
import { createEventSlice } from './eventSlice';
import { createUserSlice } from './userSlice';
import { EventState, UserState } from '~/utils/interfaces';

export const useBoundStore = create<EventState & UserState>()((...a) => ({
  ...createEventSlice(...a),
  ...createUserSlice(...a),
}));

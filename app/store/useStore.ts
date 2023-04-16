/* eslint-disable import/prefer-default-export */
import { create } from 'zustand';
import { createEventSlice, EventState } from './eventSlice';
import { createUserSlice, UserState } from './userSlice';

export const useBoundStore = create<EventState & UserState>()((...a) => ({
  ...createEventSlice(...a),
  ...createUserSlice(...a),
}));

// const create = <T>(f: T) => a;
// const create = <T>(f: get: () => T => T) => T;

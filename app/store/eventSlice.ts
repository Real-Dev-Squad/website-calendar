/* eslint-disable comma-dangle */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable no-unused-vars */
/* eslint-disable import/prefer-default-export */

import { StateCreator } from 'zustand';
import { EventState, UserState } from '~/utils/interfaces';

export const createEventSlice: StateCreator<EventState & UserState, [], [], EventState> = (
  set
) => ({
  events: [],
  addEvent: (event) => set((state) => ({ events: [...state.events, event] })),
  removeEvent: (id) =>
    set((state) => ({ events: state.events.filter((event) => event.id !== id) })),
});

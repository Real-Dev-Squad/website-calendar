import { StateCreator } from 'zustand';
import { EventState, UserState } from '~/utils/interfaces';

export const createEventSlice: StateCreator<EventState & UserState, [], [], EventState> = (
  set,
) => ({
  events: [],
  addEvent: (event) => set((state) => ({ events: [...state.events, event] })),
  removeEvent: (id) =>
    set((state) => ({ events: state.events.filter((event) => event.id !== id) })),
});

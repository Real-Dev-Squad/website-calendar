import { StateCreator } from 'zustand';
import { EventState } from '~/utils/interfaces';

export const createEventSlice: StateCreator<EventState, [], [], EventState> = (set) => ({
  events: [],
  setEvents: (events) => set((state) => ({ events: [...events] })),
  addEvent: (event) => set((state) => ({ events: [...state.events, event] })),
  removeEvent: (event) =>
    set((state) => ({ events: state.events.filter(({ id }) => id !== event.id) })),
});

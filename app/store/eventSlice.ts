import { StateCreator } from 'zustand';
import { EventState } from '~/utils/interfaces';

export const createEventSlice: StateCreator<EventState, [], [], EventState> = (set) => ({
  events: [],
  view: 'week',
  calendarId: 0,
  setEvents: (events) => set(() => ({ events: [...events] })),
  addEvent: (event) => set((state) => ({ events: [...state.events, event] })),
  removeEvent: (event) =>
    set((state) => ({ events: state.events.filter(({ id }) => id !== event.id) })),
  updateEvent: (event) =>
    set((state) => ({
      events: state.events.map((e) => (e.id === event.id ? event : e)),
    })),
  setView: (view) => set((state) => ({ ...state, view })),
  setCalendarId: (calendarId) => set((state) => ({...state, calendarId})),
});

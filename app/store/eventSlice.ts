/* eslint-disable import/prefer-default-export */
import { create } from 'zustand';
import { CalEvent } from '~/utils/interfaces';

export type EventState = {
  events: CalEvent[];
  addEvent: (event: CalEvent) => void;
  removeEvent: (event: CalEvent) => void;
};

export const createEventSlice = create<EventState>()((set) => ({
  events: [],
  addEvent: (event) => set((state) => ({ events: [...state.events, event] })),
  removeEvent: (id) =>
    set((state) => ({ events: state.events.filter((event) => event.id !== id) })),
}));

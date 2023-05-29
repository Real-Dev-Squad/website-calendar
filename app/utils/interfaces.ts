import { Event, stringOrDate } from 'react-big-calendar';
import { UpdateUserKey } from '~/types/GlobalState';

export interface Attendees {
  attendee: {
    email: string;
  };
}

export interface CalEvent extends Event {
  name?: string;
  id?: number;
  description?: string;
  location?: string;
  visibility?: string;
  ownerId?: number;
  calendarId?: number;
  attendees?: Attendees[];
}

export interface CalendarEventProps {
  show?: boolean;
  event?: CalEvent;
  new?: boolean;
}

export interface UpdateEvent {
  event: CalEvent;
  start: stringOrDate;
  end: stringOrDate;
}

export interface EventState {
  events: CalEvent[];
  currentEvent: CalEvent;
  setEvents: (events: CalEvent[]) => void;
  addEvent: (event: CalEvent) => void;
  removeEvent: (event: CalEvent) => void;
  updateEvent: (event: CalEvent) => void;
  setCurrentEvent: (currentEvent: CalEvent) => void;
}

export interface User {
  firstname: string;
  lastname: string;
  bio: string;
  username: string;
  timezone: string;
  onboarding: boolean;
}

export interface UserState {
  user: User;
  updateUser: (data: Record<UpdateUserKey, string>) => void;
}

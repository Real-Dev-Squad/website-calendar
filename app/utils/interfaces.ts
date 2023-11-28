import { View, Event, stringOrDate } from 'react-big-calendar';

import { UpdateUserKey } from '~/types/GlobalState';

export interface Attendees {
  attendee: {
    email: string;
  };
}

export interface CalEvent extends Event {
  id?: number;
  description?: string;
  location?: string;
  visibility?: string;
  ownerId?: number;
  calendarId?: number;
  attendees?: Attendees[];
  onlineEventLink?: string;
  isPrivate?: boolean;
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
  view: View;
  setEvents: (events: CalEvent[]) => void;
  addEvent: (event: CalEvent) => void;
  removeEvent: (event: CalEvent) => void;
  updateEvent: (event: CalEvent) => void;
  setView: (view: View) => void;
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

export interface UserFormInterface {
  username: string;
  firstname: string;
  lastname: string;
  timezone: string;
}

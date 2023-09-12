import dayjs from 'dayjs';
import { CalEvent } from '~/utils/interfaces';
import { parseCookie } from './cookie.utils';

// parse event obj from backend to frontend format
export const parseEvent = (event: any): CalEvent => {
  const { name, startTime, endTime, Attendees, isDeleted, ...remainingEventDetails } = event;
  return {
    ...remainingEventDetails,
    title: name,
    start: dayjs(startTime).toDate(),
    end: dayjs(endTime).toDate(),
    attendees: Attendees,
  };
};

// parse event objs from backend to frontend format
export const parseEvents = (events: any[]): Array<CalEvent> =>
  events?.reduce((acc, event) => {
    const { name, startTime, endTime, Attendees, isDeleted, ...remainingEventDetails } = event;
    return [
      ...acc,
      {
        ...remainingEventDetails,
        title: name,
        start: dayjs(startTime).toDate(),
        end: dayjs(endTime).toDate(),
        attendees: Attendees,
      },
    ];
  }, []);

export const parseEventToPayload = (event: CalEvent) => ({
  name: event.title,
  startTime: dayjs(event?.start).valueOf(),
  endTime: dayjs(event?.end).valueOf(),
  location: event.location,
  description: event.description,
  attendees: event.attendees ? event.attendees.map(({ attendee }) => attendee.email) : [],
});

export const parseEventToCreateOrUpdateEventPayload = (
  form: HTMLFormElement,
  currentEvent: CalEvent,
) => {
  const formData = new FormData(form);
  let calendarId = 0;

  if (typeof window !== 'undefined') {
    const cookie = parseCookie(document.cookie);
    calendarId = Number(cookie.calendarId);
  }

  return {
    name: formData.get('title'),
    startTime: dayjs(currentEvent.start).valueOf(),
    endTime: dayjs(currentEvent.end).valueOf(),
    location: formData.get('address'),
    calendarId,
    description: formData.get('description'),
    attendees: currentEvent.attendees
      ? currentEvent.attendees.map(({ attendee }) => attendee.email)
      : [],
  };
};

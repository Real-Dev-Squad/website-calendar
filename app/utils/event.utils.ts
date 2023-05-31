import dayjs from 'dayjs';
import { CalEvent } from '~/utils/interfaces';

// parse event objs from backend to frontend format
export const parseEvents = (events: any[]) =>
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
  attendees: event?.attendees.map(({ attendee }) => attendee.email) || [],
});

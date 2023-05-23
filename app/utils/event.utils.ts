import dayjs from 'dayjs';

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

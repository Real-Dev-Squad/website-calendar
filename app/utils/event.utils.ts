import moment from 'moment';

// parse event objs from backend to frontend format
export const parseEvents = (events: any[]) =>
  events.reduce((acc, event) => {
    const { name, startTime, endTime, Attendees, isDeleted, ...remainingEventDetails } = event;
    return [
      ...acc,
      {
        ...remainingEventDetails,
        title: name,
        start: moment(startTime).toDate(),
        end: moment(endTime).toDate(),
        attendees: Attendees,
      },
    ];
  }, []);

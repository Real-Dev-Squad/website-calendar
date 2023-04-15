import moment from 'moment';
import { useState, useCallback } from 'react';
import { CalendarEventProps, CalEvent, UpdateEvent } from '~/utils/interfaces';
import EventModal from '../components/common/eventModal';
import RdsCalendar from '../components/common/rdsCalendar';
// tilde operator not working so used relative imports

export const initialEventsList: CalEvent[] = [
  {
    id: 1,
    title: 'timed event',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit amet luctus venenatis, lectus magna fringilla urna, porttitor rhoncus dolor purus non enim praesent elementum facilisis leo, vel.',
    location: 'Nashville, Tennessee. U.S.',
    type: 'public',
    start: moment().add(1, 'hour').toDate(),
    end: moment().add(2, 'hours').toDate(),
    attendees: [
      {
        attendee: {
          name: 'Ankush Dharkar',
          email: 'attendee1@example.com',
        },
      },
      {
        attendee: {
          name: 'Harshith Venkatesh',
          email: 'attendee2@example.com',
        },
      },
      {
        attendee: {
          name: 'Yash Raj',
          email: 'attendee10@example.com',
        },
      },
    ],
    calendarId: 1,
  },
  {
    id: 2,
    title: 'Day Event',
    type: 'public',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit amet luctus venenatis, lectus magna fringilla urna, porttitor rhoncus dolor purus non enim praesent elementum facilisis leo, vel.',
    location: 'Remote',
    start: moment().add(1, 'hour').toDate(),
    end: moment().add(2, 'hours').toDate(),
    calendarId: 2,
    attendees: [
      {
        attendee: {
          name: 'Something',
          email: 'attendee3@example.com',
        },
      },
    ],
  },
  {
    id: 3,
    title: 'Recurring Event',
    type: 'public',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit amet luctus venenatis, lectus magna fringilla urna, porttitor rhoncus dolor purus non enim praesent elementum facilisis leo, vel.',
    location: 'Online',
    start: moment().add(1, 'hour').toDate(),
    end: moment().add(2, 'hours').toDate(),
    calendarId: 3,
    attendees: [
      {
        attendee: {
          name: 'Prerana Nawar',
          email: 'attendee4@example.com',
        },
      },
      {
        attendee: {
          name: 'Something',
          email: 'attendee5@example.com',
        },
      },
    ],
  },
];

const Calendar = () => {
  const [eventsList, setEventsList] = useState<CalEvent[]>(initialEventsList);
  const [calendarEvent, setCalendarEvent] = useState<CalendarEventProps>();

  const updateEventState = ({ event, start, end }: UpdateEvent) => {
    setCalendarEvent((e) => ({ ...e, event }));
    setEventsList((events) =>
      events.map((e) => {
        if (e.id === event.id) {
          e.title = event.title;
          e.start = moment(start).toDate();
          e.end = moment(end).toDate();
        }
        return e;
      })
    );
  };

  const addEvent = (event: CalEvent) => setEventsList((events) => [...events, event]);

  const setShowEvent = (show: boolean) => {
    setCalendarEvent((e) => ({ ...e, show }));
  };

  const memoizedRdsCalendar = useCallback(
    () => (
      <RdsCalendar
        eventsList={eventsList}
        currentEvent={calendarEvent?.event}
        setCalendarEvent={setCalendarEvent}
        updateEvent={updateEventState}
      />
    ),
    [eventsList]
  );

  return (
    <>
      <div className="w-[100%]">{memoizedRdsCalendar()}</div>
      {calendarEvent?.show && (
        <EventModal
          event={calendarEvent.event}
          createEvent={addEvent}
          updateEvent={updateEventState}
          setIsOpen={setShowEvent}
          newEvent={calendarEvent.new}
        />
      )}
    </>
  );
};

export default Calendar;

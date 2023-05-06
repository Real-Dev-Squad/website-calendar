import dayjs from 'dayjs';
import { useState, useCallback } from 'react';
import { View } from 'react-big-calendar';
import { CalendarEventProps, CalEvent } from '~/utils/interfaces';
import EventModal from '~/components/common/eventModal';
import RdsCalendar from '~/components/common/rdsCalendar';

const initialEventsList: CalEvent[] = [
  {
    id: 1,
    title: 'timed event',
    start: dayjs().add(1, 'hour').toDate(),
    end: dayjs().add(2, 'hours').toDate(),
    description: '',
    location: '',
    visibility: 'private',
    attendees: [{ attendee: { email: 'a@b.c' } }, { attendee: { email: 'alpha@beta.gamma' } }],
  },
  {
    id: 2,
    title: 'Some title',
    start: dayjs().add(1, 'day').toDate(),
    end: dayjs().add(1, 'day').add(2, 'hour').toDate(),
    description: '',
    location: '',
    visibility: 'public',
    attendees: [
      { attendee: { email: 'alpha@beta.gamma' } },
      { attendee: { email: 'admin@rds.com' } },
    ],
  },
  {
    id: 3,
    title: 'Another title',
    start: dayjs().add(1, 'day').add(8, 'hours').toDate(),
    end: dayjs().add(1, 'day').add(9, 'hours').toDate(),
    description: '',
    location: '',
    visibility: 'private',
    attendees: [{ attendee: { email: 'admin@rds.com' } }],
  },
];

interface CalendarProps {
  view?: View;
}

const Calendar = ({ view }: CalendarProps) => {
  const [eventsList, setEventsList] = useState<CalEvent[]>(initialEventsList);
  const [calendarEvent, setCalendarEvent] = useState<CalendarEventProps>({
    event: initialEventsList[0],
    show: false,
    new: false,
  });

  const updateEventState = (event: CalEvent) => {
    setCalendarEvent((e) => ({ ...e, event }));
    setEventsList((events) =>
      events.map((e) => {
        if (e.id === event.id) {
          e.title = event.title;
          e.start = dayjs(event.start).toDate();
          e.end = dayjs(event.end).toDate();
        }
        return e;
      }),
    );
  };

  const updateEventStateFromModal = (event: CalEvent) => {
    setCalendarEvent((e) => ({ ...e, event }));
    setEventsList((events) =>
      events.map((e) => {
        if (e.id === event.id) {
          return event;
        }
        return e;
      }),
    );
  };

  const addEvent = (event: CalEvent) => setEventsList((events) => [...events, event]);

  const setShowEvent = (show: boolean) => {
    setCalendarEvent((e) => ({ ...e, show }));
  };

  const memoizedRdsCalendar = useCallback(
    () => (
      <RdsCalendar
        view={view}
        eventsList={eventsList}
        currentEvent={calendarEvent?.event}
        setCalendarEvent={setCalendarEvent}
        updateEvent={updateEventState}
      />
    ),
    [eventsList],
  );

  return (
    <>
      <div className="w-[100%]">{memoizedRdsCalendar()}</div>
      {calendarEvent?.show && (
        <EventModal
          event={calendarEvent.event}
          eventsList={eventsList}
          currentEvent={calendarEvent?.event}
          createEvent={addEvent}
          updateEvent={updateEventStateFromModal}
          setIsOpen={setShowEvent}
          newEvent={calendarEvent.new}
          setCalendarEvent={setCalendarEvent}
        />
      )}
    </>
  );
};

export default Calendar;

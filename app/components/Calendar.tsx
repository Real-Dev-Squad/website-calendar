import moment from 'moment';
import { useState, useCallback } from 'react';
import { CalendarEventProps, CalEvent, UpdateEvent } from '~/utils/interfaces';
import EventModal from '../components/common/eventModal';
import RdsCalendar from '../components/common/rdsCalendar';
// tilde operator not working so used relative imports

const initialEventsList: CalEvent[] = [
  {
    id: '1',
    title: 'timed event',
    start: moment().add(1, 'hour').toDate(),
    end: moment().add(2, 'hours').toDate(),
  },
  {
    id: '2',
    title: 'Some title',
    start: moment().add(1, 'day').toDate(),
    end: moment().add(1, 'day').add(2, 'hour').toDate(),
  },
  {
    id: '3',
    title: 'Another title',
    start: moment().add(1, 'day').add(8, 'hours').toDate(),
    end: moment().add(1, 'day').add(9, 'hours').toDate(),
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

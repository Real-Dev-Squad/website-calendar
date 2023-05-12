import dayjs from 'dayjs';
import { useState, useCallback } from 'react';
import { View } from 'react-big-calendar';
import { CalendarEventProps, CalEvent } from '~/utils/interfaces';
import EventModal from '~/components/common/eventModal';
import RdsCalendar from '~/components/common/rdsCalendar';
import { useStore } from '~/store/useStore';

interface CalendarProps {
  view?: View;
}

const Calendar = ({ view }: CalendarProps) => {
  const events = useStore((state) => state.events);

  const [eventsList, setEventsList] = useState<CalEvent[]>(events);
  const [calendarEvent, setCalendarEvent] = useState<CalendarEventProps>({
    event: events[0],
    show: false,
    new: false,
  });

  useEffect(() => {
    setEventsList(events);
  }, [events]);

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

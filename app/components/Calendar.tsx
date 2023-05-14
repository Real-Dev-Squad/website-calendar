import moment from 'moment';
import axios from 'axios';
import { useState, useCallback, useEffect } from 'react';
import { View } from 'react-big-calendar';
import { CalendarEventProps, CalEvent } from '~/utils/interfaces';
import EventModal from '~/components/common/eventModal';
import RdsCalendar from '~/components/common/rdsCalendar';
import { useStore } from '~/store/useStore';
import { patchEvent } from '~/constants/urls.constants';

interface CalendarProps {
  view?: View;
  HOST: string;
}

const Calendar = ({ view, HOST }: CalendarProps) => {
  const { events, updateEvent } = useStore((state) => state);

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
          e.start = moment(event.start).toDate();
          e.end = moment(event.end).toDate();
        }
        return e;
      }),
    );
  };

  const updateEventStateFromModal = (event: CalEvent) => {
    console.log(event);

    setCalendarEvent((e) => ({ ...e, event }));
    axios(patchEvent(HOST, event.id as number), {
      method: 'patch',
      data: { ...event, start: moment(event.start).valueOf(), end: moment(event.end).valueOf() },
      withCredentials: true,
    });
    setEventsList((events) =>
      events.map((e) => {
        if (e.id === event.id) {
          return event;
        }
        return e;
      }),
    );
    updateEvent(event);
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

import dayjs from 'dayjs';
import { useState, useCallback } from 'react';
import { useSubmit } from '@remix-run/react';
import { View } from 'react-big-calendar';
import { CalEvent } from '~/utils/interfaces';
import RdsCalendar from '~/components/common/rdsCalendar';
interface CalendarProps {
  view?: View;
  events: CalEvent[];
}

const Calendar = ({ view, events }: CalendarProps) => {
  const [eventsList, setEventsList] = useState<CalEvent[]>([]);

  const updateEventState = (event: CalEvent) => {
    // setCalendarEvent((e) => ({ ...e, event }));
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

  const memoizedRdsCalendar = useCallback(
    () => (
      <RdsCalendar
        view={view}
        eventsList={events}
        currentEvent={events[0] ? events[0] : {}}
        updateEvent={updateEventState}
      />
    ),
    [eventsList],
  );

  return (
    <>
      <div className="w-[100%]">{memoizedRdsCalendar()}</div>
    </>
  );
};

export default Calendar;

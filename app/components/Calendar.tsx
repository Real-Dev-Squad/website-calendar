import React from 'react';
import { View } from 'react-big-calendar';
import { CalEvent, CalendarEventProps } from '~/utils/interfaces';
import RdsCalendar from '~/components/common/rdsCalendar';

interface CalendarProps {
  view?: View;
  events: CalEvent[];
}

const Calendar = ({ view, events }: CalendarProps) => {
  const memoizedRdsCalendar = React.useCallback(
    () => (
      <RdsCalendar
        view={view}
        eventsList={events}
        currentEvent={events[0] ? events[0] : {}}
        setCalendarEvent={function (value: React.SetStateAction<CalendarEventProps>): void {
          throw new Error('Function not implemented.');
        }}
      />
    ),
    [events],
  );

  return (
    <>
      <div className="w-[100%]">{memoizedRdsCalendar()}</div>
    </>
  );
};

export default Calendar;

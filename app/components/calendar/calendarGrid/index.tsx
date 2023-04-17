import React from 'react';
import CalendarEventCard from '~/components/calendar/calendarEventCard';

const CalendarGrid = () => (
  <>
    <div data-testid="grid-box" className="w-full grid grid-cols-3 relative">
      {new Array(3).fill(0).map((day) => (
        <div className="w-full h-full border-r-1 border-grey-light" key={day}>
          {new Array(12).fill(0).map((hour) => (
            <div className="w-full h-[87px] border-t-1 border-grey-light" key={hour}></div>
          ))}
        </div>
      ))}
      <div
        data-testid="grid-events"
        className="absolute left-[calc(100%/3)] top-[calc(87px*2)] w-[calc(100%/3)] pr-2 h-[calc(87px*3)]"
      >
        <CalendarEventCard
          title={'Marketing meet with John'}
          dateFrom={'12:00 PM'}
          dateTo={'1:00 PM'}
        />
      </div>
    </div>
  </>
);

export default CalendarGrid;

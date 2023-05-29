import React from 'react';
import { View } from 'react-big-calendar';
import { CalEvent, CalendarEventProps } from '~/utils/interfaces';
import RdsCalendar from '~/components/common/rdsCalendar';
import { useStore } from '~/store/useStore';
import { parseEvents } from '~/utils/event.utils';
import dayjs from 'dayjs';
import axios from 'axios';
import { patchEvent } from '~/constants/urls.constants';

interface CalendarProps {
  view?: View;
  events: CalEvent[];
}

const Calendar = ({ view, events }: CalendarProps) => {
  const { events: eventsList, updateEvent } = useStore((state) => state);

  const updateEventStateFromCalendar = async (event: CalEvent) => {
    const { id } = event;
    const payload = {
      name: event.title,
      startTime: dayjs(event?.start).valueOf(),
      endTime: dayjs(event?.end).valueOf(),
      location: event.location,
      description: event.description,
      attendees: event?.attendees ? event.attendees.map(({ attendee }) => attendee.email) : [],
    };

    try {
      const response = await axios(patchEvent(window.ENV.API_HOST, id), {
        method: 'patch',
        data: payload,
        withCredentials: true,
      });

      updateEvent(parseEvents([{ ...response.data.data }])[0]);
    } catch (error) {
      console.log(error);
    }

    updateEvent(event);
  };

  const memoizedRdsCalendar = React.useCallback(
    () => (
      <RdsCalendar
        view={view}
        eventsList={events}
        currentEvent={events[0] ? events[0] : {}}
        updateEvent={updateEventStateFromCalendar}
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

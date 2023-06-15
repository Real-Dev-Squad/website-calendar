import React from 'react';
import { View } from 'react-big-calendar';
import axios from 'axios';
import { toast } from 'react-toastify';
import { CalEvent } from '~/utils/interfaces';
import RdsCalendar from '~/components/common/rdsCalendar';
import { useStore } from '~/store/useStore';
import { parseEvents, parseEventToPayload } from '~/utils/event.utils';
import { patchEvent } from '~/constants/urls.constants';

interface CalendarProps {
  view?: View;
  events: CalEvent[];
}

const Calendar = ({ view, events }: CalendarProps) => {
  const { updateEvent, events: globalEvents } = useStore((state) => state);

  const updateEventStateFromCalendar = async (event: CalEvent) => {
    const { id } = event;
    const prevEvent = globalEvents.find((ev) => ev.id === id) as CalEvent;
    updateEvent(event);
    const payload = parseEventToPayload(event);
    try {
      const response = await axios(patchEvent(window.ENV.API_HOST, id as number), {
        method: 'patch',
        data: payload,
        withCredentials: true,
      });
      updateEvent(parseEvents([{ ...response.data.data }])[0]);
    } catch (error) {
      toast.error('unable to update', {
        toastId: 'events_error',
      });
      updateEvent(prevEvent);
    }
  };

  const memoizedRdsCalendar = React.useCallback(
    () => (
      <RdsCalendar
        view={view}
        eventsList={events}
        currentEvent={events.length ? events[0] : {}}
        updateEvent={updateEventStateFromCalendar}
      />
    ),
    [events, view],
  );

  return (
    <>
      <div className="w-[100%]">{memoizedRdsCalendar()}</div>
    </>
  );
};

export default Calendar;

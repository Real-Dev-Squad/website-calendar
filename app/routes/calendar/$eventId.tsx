import React from 'react';
import { useParams } from '@remix-run/react';
import EventModal from '~/components/common/eventModal';
import { useStore } from '~/store/useStore';
import { CalEvent } from '~/utils/interfaces';

const EventDetails = () => {
  const { events: eventsList } = useStore((state) => state);
  const [calendarEvent, setCalendarEvent] = React.useState<any>({
    title: '',
    start: undefined,
    end: undefined,
    location: '',
    description: '',
    attendees: [],
  });

  const params = useParams();

  React.useEffect(() => {
    if (params.eventId !== 'new') {
      const calEvent = eventsList.find(
        (event: CalEvent) => event.id === parseInt(params.eventId as string, 10),
      );
      setCalendarEvent({
        title: calEvent!.title,
        start: calEvent!.start,
        end: calEvent!.end,
        location: calEvent!.location,
        description: calEvent!.description,
        attendees: calEvent!.attendees,
      });
    }
    console.log({ calendarEvent });
  }, [calendarEvent]);

  return (
    <div>
      <EventModal
        events={eventsList}
        currentEvent={calendarEvent}
        setCalendarEvent={setCalendarEvent}
      />
    </div>
  );
};

export default EventDetails;

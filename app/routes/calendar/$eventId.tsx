import React from 'react';
import { useParams, useNavigate } from '@remix-run/react';
import { toast } from 'react-toastify';
import EventModal from '~/components/common/eventModal';
import { useStore } from '~/store/useStore';
import { CalEvent } from '~/utils/interfaces';
import { dummyEvent } from '~/constants/events.constants';

const EventDetails = () => {
  const { events: eventsList } = useStore((state) => state);
  const [calendarEvent, setCalendarEvent] = React.useState<CalEvent>(dummyEvent);

  const params = useParams();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (params.eventId !== 'new') {
      const calEvent = eventsList.find(
        (event: CalEvent) => event.id === parseInt(params.eventId as string, 10),
      );

      if (calEvent) {
        setCalendarEvent({
          ...calEvent,
        });
      } else {
        toast.error('cannot find event', {
          toastId: 'events_error',
        });
        navigate(-1);
      }
    }
  }, []);

  return (
    <div>
      <EventModal
        currentEvent={calendarEvent}
        events={eventsList}
        isNewEvent={params.eventId === 'new'}
        setCalendarEvent={setCalendarEvent}
      />
    </div>
  );
};

export default EventDetails;

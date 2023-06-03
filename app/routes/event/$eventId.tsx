import React from 'react';
import axios from 'axios';
import { useParams, useNavigate, useLoaderData } from '@remix-run/react';
import { LoaderFunction, json } from '@remix-run/node';
import EventModal from '~/components/common/eventModal';
import { useStore } from '~/store/useStore';
import { CalEvent } from '~/utils/interfaces';
import { dummyEvent } from '~/constants/events.constants';
import { getEventById } from '~/constants/urls.constants';
import { parseEvents } from '~/utils/event.utils';

type LoaderData = {
  event: any;
  error: string | null;
};

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);

  const cookie = request.headers.get('cookie');
  try {
    const response = await axios.get(
      getEventById(process.env.API_HOST as string, parseInt(url.pathname.split('/')[2], 10)),
      {
        headers: {
          'Content-Type': 'application/json',
          Cookie: cookie,
        },
      },
    );
    return json<LoaderData>({ event: response.data.data, error: null });
  } catch (error) {
    throw new Response(null, {
      status: 404,
      statusText: 'Not Found',
    });
  }
};

const EventDetails = () => {
  const { event } = useLoaderData();

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
      }
    }
  }, []);
  console.log({ event: parseEvents([event])[0] });
  return (
    <div>
      <EventModal
        currentEvent={parseEvents([event])[0] ?? calendarEvent}
        events={eventsList}
        isNewEvent={params.eventId === 'new'}
        setCalendarEvent={setCalendarEvent}
      />
    </div>
  );
};

export default EventDetails;

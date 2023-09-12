import axios from 'axios';
import { useLoaderData, ShouldRevalidateFunction } from '@remix-run/react';
import { LoaderFunction, json } from '@remix-run/node';
import EventModal from '~/components/common/eventModal';
import { dummyEvent } from '~/constants/events.constants';
import { getEventById } from '~/constants/urls.constants';
import { CalEvent } from '~/utils/interfaces';
import { parseEvent } from '~/utils/event.utils';

type LoaderData = {
  emptyEvent?: CalEvent;
  serverEvent?: any;
};

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const cookie = request.headers.get('cookie');

  const eventId = url.pathname.split('/')[2];

  if (eventId === 'new') return json<LoaderData>({ emptyEvent: dummyEvent });

  try {
    const response = await axios.get(
      getEventById(process.env.API_HOST as string, parseInt(eventId, 10)),
      {
        headers: {
          'Content-Type': 'application/json',
          Cookie: cookie,
        },
      },
    );
    return json<LoaderData>({ serverEvent: response.data.data });
  } catch (error) {
    throw new Response(null, {
      status: 404,
      statusText: 'Not Found',
    });
  }
};

const shouldRevalidate: ShouldRevalidateFunction = ({}) => false;

const EventDetails = () => {
  const { emptyEvent, serverEvent } = useLoaderData();

  const event = emptyEvent ?? parseEvent(serverEvent);

  return <EventModal event={event} />;
};

export default EventDetails;

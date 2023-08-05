import axios from 'axios';
import { useLoaderData, useActionData, useNavigate } from '@remix-run/react';
import { ActionArgs, LoaderFunction, json } from '@remix-run/node';
import { redirect } from '@remix-run/server-runtime';
import EventModal from '~/components/common/eventModal';
import { dummyEvent } from '~/constants/events.constants';
import { getEventById } from '~/constants/urls.constants';
import { CalEvent } from '~/utils/interfaces';
import { parseEvent } from '~/utils/event.utils';
import dayjs from 'dayjs';
import { patchEvent, postEvent } from '../../../constants/urls.constants';
import { parseEvents } from '../../../utils/event.utils';
import { toast } from 'react-toastify';

type LoaderData = {
  emptyEvent?: CalEvent;
  serverEvent?: any;
};

export const loader: LoaderFunction = async ({ request, params }) => {
  const url = new URL(request.url);
  const cookie = request.headers.get('cookie');

  const eventId = params.eventId!;

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

const getEventPayload = ({ formData }: { formData: FormData }) => {
  const calendarId = formData.get('calendarId');
  const event = formData.get('event')! as CalEvent;
  return {
    name: formData.get('title'),
    startTime: dayjs(event.start).valueOf(),
    endTime: dayjs(event.end).valueOf(),
    location: formData.get('address'),
    calendarId: Number(calendarId),
    description: formData.get('description'),
    attendees: event.attendees ? event.attendees.map(({ attendee }) => attendee.email) : [],
  };
};

export async function action({ request, params }: ActionArgs) {
  const payload = getEventPayload({ formData: await request.formData() });

  if (params.eventId !== 'new') {
    try {
      const response = await axios(
        patchEvent(
          window.ENV.API_HOST,
          parseInt(params.eventId ? params.eventId : '', 10) as number,
        ),
        {
          method: 'patch',
          data: payload,
          withCredentials: true,
        },
      );

      // updateEvent(parseEvents([{ ...response.data.data }])[0]);
      redirect('/');
    } catch (error) {
      toast.error('unable to update event', {
        toastId: 'events_error',
      });
    }
    return null;
  }

  try {
    const response = await axios(postEvent(window.ENV.API_HOST), {
      method: 'post',
      data: payload,
      withCredentials: true,
    });
    // addEvent(parseEvents([{ ...response.data.data }])[0]);
    // toast.success('successfully added event', {
    //   toastId: 'events_success',
    // });
    redirect('/');
  } catch (error) {
    toast.error('unable to add event', {
      toastId: 'events_error',
    });
  }
  return null;
}

// const shouldRevalidate: ShouldRevalidateFunction = ({}) => false;

const EventDetails = () => {
  const data = useActionData<typeof action>();
  const { emptyEvent, serverEvent } = useLoaderData();

  const event = emptyEvent ?? parseEvent(serverEvent);

  return <EventModal event={event} statuses={data ? 'loading' : 'idle'} />;
};

export default EventDetails;

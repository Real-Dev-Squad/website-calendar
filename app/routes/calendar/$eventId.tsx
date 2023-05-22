import React from 'react';
import { redirect, ActionArgs } from '@remix-run/node';
import { useMatches, useParams, useActionData } from '@remix-run/react';
import axios from 'axios';
import { toast } from 'react-toastify';
import EventModal from '~/components/common/eventModal';
import { CalEvent } from '~/utils/interfaces';
import { parseEvents } from '~/utils/event.utils';
import { patchEvent } from '~/constants/urls.constants';

export async function action({ request }: ActionArgs) {
  // console.log({ request });
  const cookie = request.headers.get('cookie');

  const formData = await request.formData();
  const url = new URL(request.url);
  const id = url.pathname.split('/')[2];
  const payload = {
    name: formData.get('name'),
    startTime: parseInt(formData.get('startTime') as string),
    endTime: parseInt(formData.get('endTime') as string),
    location: formData.get('location'),
    description: formData.get('description'),
    attendees: (formData.get('attendees') as string).split(','),
  };

  try {
    const response = await axios.patch(
      patchEvent(process.env.API_HOST ?? '', parseInt(id)),
      payload,
      {
        headers: {
          Cookie: cookie,
          'Content-Type': 'application/json',
        },
      },
    );

    return redirect('/calendar');
  } catch (error) {
    return { error };
  }
}

const EventDetails = () => {
  const matches = useMatches();
  const params = useParams();
  const actData = useActionData();
  const [openModal, setOpenModal] = React.useState<boolean>(false);
  const [calendarEvent, setCalendarEvent] = React.useState<any>();

  const { data } = matches[1];
  const { events: eventsList } = data;

  React.useEffect(() => {
    const calEvent = data.events.find(
      (event: CalEvent) => event.id === parseInt(params.eventId as string),
    );

    setCalendarEvent({
      title: calEvent.name,
      start: calEvent.startTime,
      end: calEvent.endTime,
      location: calEvent.location,
      description: calEvent.description,
      attendees: calEvent.Attendees,
    });
  }, []);
  return (
    <div>
      <EventModal
        event={calendarEvent}
        eventsList={parseEvents(eventsList)}
        currentEvent={calendarEvent}
        setIsOpen={setOpenModal}
        newEvent={false}
        setCalendarEvent={setCalendarEvent}
      />
    </div>
  );
};

export default EventDetails;

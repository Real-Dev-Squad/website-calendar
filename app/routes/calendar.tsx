import { useEffect } from 'react';
import { LinksFunction, LoaderFunction, json } from '@remix-run/node';
import { Outlet, useLoaderData, ShouldReloadFunction } from '@remix-run/react';
import { toast, ToastContainer } from 'react-toastify';
import styles from 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';
import dayjs from 'dayjs';
import Calendar from '~/components/Calendar';
import Navbar from '~/components/common/navbar';
import { useStore } from '~/store/useStore';
import { parseEvents } from '~/utils/event.utils';
import { getEvents } from '~/constants/urls.constants';
import { getUrls } from '~/models/urls.server';

type LoaderData = {
  ENV: Awaited<ReturnType<typeof getUrls>>;
  events: any;
  error: string | null;
};

export const loader: LoaderFunction = async ({ request }) => {
  const baseUrls = await getUrls();
  const cookie = request.headers.get('cookie');
  const startTime = dayjs().subtract(1, 'months').startOf('month').unix() * 1000;
  const endTime = dayjs().add(1, 'months').endOf('month').unix() * 1000;

  try {
    const response = await axios.get(getEvents(process.env.API_HOST ?? '', startTime, endTime), {
      headers: {
        'Content-Type': 'application/json',
        Cookie: cookie,
      },
    });
    return json<LoaderData>({ events: response.data.data, ENV: baseUrls, error: null });
  } catch (error) {
    return { events: null, ENV: baseUrls, error };
  }
};
export const unstableShouldReload: ShouldReloadFunction = () => false;

export const links: LinksFunction = () => [{ rel: 'stylesheet', href: styles }];

function CalendarPage() {
  const { setEvents, events: eventList, view } = useStore((state) => state);
  const { events, error } = useLoaderData();

  useEffect(() => {
    if (error === null && events.length > 0) {
      // TODO: show a  different message if events are not present in the given date range

      setEvents([parseEvents(events)][0]);
    } else {
      // TODO: redirect the user to login page on 401
      toast.error('Unable to get events', {
        toastId: 'events_error',
      });
    }
  }, []);

  return (
    <div className="">
      <div className="flex flex-col-reverse md:flex-row ">
        <Navbar />
        <div className="flex justify-center flex-grow">
          <ToastContainer />
          <Calendar events={eventList.length ? eventList : parseEvents(events ?? [])} view={view} />
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default CalendarPage;

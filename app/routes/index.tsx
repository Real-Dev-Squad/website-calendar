import { LinksFunction, LoaderFunction } from '@remix-run/node';
import styles from 'react-datepicker/dist/react-datepicker.css';
import Calendar from '~/components/Calendar';
import Navbar from '~/components/common/navbar';
import axios from 'axios';
import dayjs from 'dayjs';
import { useStore } from '~/store/useStore';
import { useLoaderData } from '@remix-run/react';
import { parseEvents } from '~/utils/event.utils';
import { getEvents } from '~/constants/urls.constants';
import { ToastContainer, toast } from 'react-toastify';
import { useEffect } from 'react';

export let loader: LoaderFunction = async ({ request }) => {
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
    return { events: response.data.data, error: null };
  } catch (error) {
    return { events: null, error: error };
  }
};

export const links: LinksFunction = () => [{ rel: 'stylesheet', href: styles }];

export default function Index() {
  const setEvents = useStore((state: { setEvents: any }) => state.setEvents);
  const response = useLoaderData();

  useEffect(() => {
    if (response.error === null && response.events.length > 0) {
      setEvents(parseEvents(response.events));
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
          <Calendar />
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

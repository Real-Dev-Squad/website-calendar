import { useEffect } from 'react';
import { LoaderFunction, json, redirect } from '@remix-run/node';
import { Outlet, useLoaderData } from '@remix-run/react';
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios';
import dayjs from 'dayjs';
import Calendar from '~/components/Calendar';
import Navbar from '~/components/common/navbar';
import { useStore } from '~/store/useStore';
import { parseEvents } from '~/utils/event.utils';
import { getEvents, getUserCalendarId, getUserSelfData } from '~/constants/urls.constants';
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
  axios.defaults.headers.common['Content-Type'] = 'application/json';
  axios.defaults.headers.common['Cookie'] = cookie;
  try {
    const { data } = await axios.get(getUserSelfData(process.env.API_HOST!)).catch((_) => ({
      data: null,
      ENV: baseUrls,
      error: 'Unable to fetch the user details, please login',
    }));

    const userName = data?.data?.username;
    if (userName) {
      const { data } = await axios
        .get(getUserCalendarId(process.env.API_HOST!, userName))
        .catch((_) => ({
          data: null,
          ENV: baseUrls,
          error: 'Unable to fetch the owner details, please login',
        }));

      const ownerID = data?.data?.rCal[0]?.ownerId;
      if (ownerID) {
        const { data: eventDetails } = await axios
          .get(getEvents(process.env.API_HOST!, 1, startTime, endTime))
          .catch((_) => ({
            data: null,
            ENV: baseUrls,
            error: 'Unable to fetch the event Details',
          }));

        return json<LoaderData>({ events: eventDetails?.data, ENV: baseUrls, error: null });
      }
      return json<any>({ events: null, ENV: baseUrls, error: 'Unable to fetch the owner details' });
    }
    return redirect('/login');
  } catch (error) {
    return { events: null, ENV: baseUrls, error };
  }
};

function CalendarPage() {
  const { setEvents, events: eventList, view } = useStore((state) => state);
  const { events, error } = useLoaderData();

  useEffect(() => {
    if (error === null && events.length > 0) {
      // TODO: show a  different message if events are not present in the given date range

      setEvents([parseEvents(events)][0]);
    } else if (error === null && events.length === 0) {
      // TODO: discuss regarding display of user message in case of no events
    } else {
      // TODO: redirect the user to login page on 401
      toast.error(error, {
        toastId: 'events_error',
      });
    }
  }, []);

  return (
    <div className="">
      <div className="flex flex-col-reverse md:flex-row ">
        <Navbar />
        <div className="flex justify-center flex-grow">
          <Calendar events={eventList.length ? eventList : parseEvents(events ?? [])} view={view} />
          <Outlet />
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default CalendarPage;

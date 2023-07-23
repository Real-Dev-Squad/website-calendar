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
  calendarId?: string;
};

export const loader: LoaderFunction = async ({ request }) => {
  const baseUrls = await getUrls();
  const cookie = request.headers.get('cookie');
  const startTime = dayjs().subtract(1, 'months').startOf('month').unix() * 1000;
  const endTime = dayjs().add(1, 'months').endOf('month').unix() * 1000;
  axios.defaults.headers.common['Content-Type'] = 'application/json';
  axios.defaults.headers.common['Cookie'] = cookie;
  console.log(getUserSelfData(process.env.API_HOST!))
  try {
    const { data } = await axios.get(getUserSelfData(process.env.API_HOST!)).catch((_) => ({
      data: null,
      ENV: baseUrls,
      error: 'Unable to fetch the user details, please login',
    }));

    const userData = data?.data;

    if (!userData) {
      return redirect('/login');
    }

    const userName = userData.username;

    if (!userName) {
      return redirect('/onboarding');
    }

    const { data: calendarData } = await axios
      .get(getUserCalendarId(process.env.API_HOST!, userName))
      .catch((_) => ({
        data: null,
        ENV: baseUrls,
        error: 'Unable to fetch the owner details, please login',
      }));
    const ownerId = calendarData?.data?.rCal[0]?.ownerId;
    const calendarId = calendarData?.data?.rCal[0]?.id;

    if (ownerId) {
      const { data: eventDetails } = await axios
        .get(getEvents(process.env.API_HOST!, calendarId, startTime, endTime))
        .catch((_) => ({
          data: null,
          ENV: baseUrls,
          error: 'Unable to fetch the event Details',
        }));

      return json<LoaderData>({ events: eventDetails?.data, calendarId, ENV: baseUrls, error: null });
    }

    return json<any>({ events: null, ENV: baseUrls, error: 'Unable to fetch the owner details' });
  } catch (error) {
    return { events: null, ENV: baseUrls, error };
  }
};

function CalendarPage() {
  const { setEvents, events: eventList, view } = useStore((state) => state);
  const { events, error, calendarId } = useLoaderData();
  useEffect(() => {
    if (error === null && events.length > 0) {
      // TODO: show a  different message if events are not present in the given date range
      localStorage.setItem('calendarId',calendarId)
      setEvents([parseEvents(events)][0]);
    } else if (error === null && events.length === 0) {
      // TODO: discuss regarding display of user message in case of no events
      localStorage.setItem('calendarId',calendarId)
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

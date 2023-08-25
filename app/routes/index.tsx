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
import { getEvents } from '~/constants/urls.constants';
import { getUrls } from '~/models/urls.server';
import { parseCookie } from '~/utils/cookie.utils';

type LoaderData = {
  apiHost?: string;
};

export const loader: LoaderFunction = async ({ request }) => {
  const { API_HOST = '' } = await getUrls();
  const cookieHeader = request.headers.get('cookie');

  if (cookieHeader) {
    const cookies = parseCookie(cookieHeader);

    /*
      routes from where the required cookies are set:
      rcalSession: from backend (stored as rcal-session: kebab to camel req)
      calendarId: from backend (stored as calendar-id: kebab to camel req)
      username: from backend & onboarding/userDetails.tsx
    */
    const { rcalSession, username, calendarId } = cookies;

    if (rcalSession && calendarId) {
      if (username) return json<LoaderData>({ apiHost: API_HOST });
      // session cookie exist but no username; onboarding is pending
      return redirect('/onboarding');
    }
  }

  // no session cookie
  return redirect('/login');
};

function CalendarPage() {
  const { setEvents, events, view } = useStore((state) => state);
  const { apiHost } = useLoaderData();

  const fetchEvents = async () => {
    if (!apiHost) return;

    let calendarId = 0;
    const startTime = dayjs().subtract(1, 'months').startOf('month').unix() * 1000;
    const endTime = dayjs().add(1, 'months').endOf('month').unix() * 1000;

    if (typeof window !== 'undefined') {
      const cookie = parseCookie(document.cookie);
      calendarId = Number(cookie.calendarId);
    }

    try {
      const { data: eventsList } = await axios.get(
        getEvents(apiHost, calendarId, startTime, endTime),
        {
          withCredentials: true,
        },
      );
      setEvents(parseEvents(eventsList.data));
    } catch (error) {
      toast.error('Unable to fetch the event Details', {
        toastId: 'events_error',
      });
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <div className="">
      <div className="flex flex-col-reverse md:flex-row ">
        <Navbar />
        <div className="flex justify-center flex-grow">
          <Calendar events={events} view={view} />
          <Outlet />
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default CalendarPage;

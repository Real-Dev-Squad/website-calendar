import { MetaFunction, LinksFunction, LoaderFunction, redirect, json } from '@remix-run/node';
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from '@remix-run/react';
import { useEffect } from 'react';
import axios from 'axios';
import dayjs from 'dayjs';
import { ToastContainer, toast } from 'react-toastify';
import { parseCookie } from './utils/cookie.utils';
import { getEnv } from './models/env.server';
import { nodeEnv } from './constants/generic.constants';
import { parseEvents } from './utils/event.utils';
import { getEvents } from './constants/urls.constants';
import { useStore } from '~/store/useStore';
import styles from './styles/tailwind.css';
import globalStyles from './styles/global.css';

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: styles },
  { rel: 'stylesheet', href: globalStyles },
  { rel: 'icon', href: '/icons/favicon.ico' },
];

export const meta: MetaFunction = () => ({
  charset: 'utf-8',
  title: 'RCal',
  viewport: 'width=device-width,initial-scale=1',
});

type LoaderData = {
  ENV: {
    NODE_ENV: 'development' | 'production' | 'test';
    API_HOST: string;
    GOOGLE_OAUTH: string;
    MICROSOFT_OAUTH: string;
  };
  calendarId?: string;
};

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const ENV = await getEnv();
  const cookieHeader = request.headers.get('cookie');

  /*
    routes from where the required cookies are set:
    rcalSession: from backend (stored as rcal-session: kebab to camel req)
    rcalSessionStaging: from backend (stored as rcal-session-staging: kebab to camel req)
    calendarId: from backend (stored as calendar-id: kebab to camel req)
    username: from backend & onboarding/userDetails.tsx
  */
  if (cookieHeader) {
    const cookies = parseCookie(cookieHeader);
    const isStaging = ENV.NODE_ENV === nodeEnv.development;
    const sessionCookie = isStaging ? cookies.rcalSessionStaging : cookies.rcalSession;
    const { username, calendarId } = cookies;

    if (sessionCookie && calendarId) {
      // session cookie exists but no username; onboarding is pending
      if (!username && !url.pathname.startsWith('/onboarding')) return redirect('/onboarding');

      // session cookie exists and has a username, but trying to access /onboarding or /login route
      if (username && (url.pathname.startsWith('/onboarding') || url.pathname === '/login'))
        return redirect('/');

      return json<LoaderData>({ ENV, calendarId });
    }
  }

  // No session cookie, and the user is not already on the /login route
  if (url.pathname !== '/login') return redirect('/login');

  return json<LoaderData>({ ENV });
};

const App = () => {
  const { ENV, calendarId } = useLoaderData();
  const { setEvents } = useStore((state) => state);

  const fetchEvents = async () => {
    if (!ENV.API_HOST || !calendarId) return;

    const startTime = dayjs().subtract(1, 'months').startOf('month').unix() * 1000;
    const endTime = dayjs().add(1, 'months').endOf('month').unix() * 1000;

    try {
      const { data: eventsList } = await axios.get(
        getEvents(ENV.API_HOST, Number(calendarId), startTime, endTime),
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        },
      );
      setEvents(parseEvents(eventsList.data));
    } catch (error) {
      toast.error('Unable to fetch the events', {
        toastId: 'events_error',
      });
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.ENV = ${JSON.stringify(ENV)}`,
          }}
        />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
        <ToastContainer />
      </body>
    </html>
  );
};

export default App;

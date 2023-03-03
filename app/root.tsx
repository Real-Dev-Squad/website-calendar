import { MetaFunction, LinksFunction, json } from '@remix-run/node';
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from '@remix-run/react';
import { envObj } from './env.server';
import styles from './styles/tailwind.css';
import globalstyles from './styles/global.css';

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: styles },
  { rel: 'stylesheet', href: globalstyles },
  { rel: 'icon', href: '/icons/favicon.ico' },
  { rel: 'stylesheet', href: 'https://uicdn.toast.com/calendar/latest/toastui-calendar.min.css' },
  {
    rel: 'stylesheet',
    href: 'https://uicdn.toast.com/tui.date-picker/latest/tui-date-picker.css',
  },
  {
    rel: 'stylesheet',
    href: 'https://uicdn.toast.com/tui.time-picker/latest/tui-time-picker.css',
  },
];

export const meta: MetaFunction = () => ({
  charset: 'utf-8',
  title: 'RCal',
  viewport: 'width=device-width,initial-scale=1',
});

export async function loader() {
  return json({
    ENV: envObj,
  });
}

const App = () => {
  const data = useLoaderData<typeof loader>();

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
            __html: `window.ENV = ${JSON.stringify(data.ENV)}`,
          }}
        />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
};

export default App;

import { Links, LiveReload, Meta, Outlet, Scripts, ScrollRestoration } from 'remix';
import type { MetaFunction } from 'remix';
import styles from './tailwind.css';
import globalStylesUrl from './styles/global.css';

export function links() {
  return [
    { rel: 'stylesheet', href: styles },
    { rel: 'stylesheet', href: globalStylesUrl },
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
}

export const meta: MetaFunction = () => ({ title: 'RDS Website Calendar' });

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        {process.env.NODE_ENV === 'development' && <LiveReload />}
      </body>
    </html>
  );
}

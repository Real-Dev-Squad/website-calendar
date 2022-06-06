import { Links, LiveReload, Meta, Outlet, Scripts, ScrollRestoration } from 'remix';
import type { MetaFunction } from 'remix';
import styles from './tailwind.css';
import globalStylesUrl from '~/styles/global.css';

export function links() {
  return [
    { rel: 'stylesheet', href: styles },
    { rel: 'stylesheet', href: globalStylesUrl },
    { rel: 'icon', href: '/icons/favicon.ico' },
  ];
}

export const meta: MetaFunction = () => {
  return { title: 'New Remix App' };
};

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

import { LoaderFunction, redirect, LinksFunction } from '@remix-run/node';
import styles from 'react-datepicker/dist/react-datepicker.css';
import { Outlet } from '@remix-run/react';

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  if (url.pathname === '/event') {
    return redirect('/');
  }
  return null;
};

export const links: LinksFunction = () => [{ rel: 'stylesheet', href: styles }];

function EventsPage() {
  return <Outlet />;
}

export default EventsPage;

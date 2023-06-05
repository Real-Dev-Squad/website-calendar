import { LoaderFunction, redirect, LinksFunction } from '@remix-run/node';
import styles from 'react-datepicker/dist/react-datepicker.css';
import { Outlet, useCatch, Link } from '@remix-run/react';
import { CalendarIcon } from '@heroicons/react/24/outline';

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

export function CatchBoundary() {
  const caught = useCatch();
  return (
    <html>
      <head>
        <title>Oops!</title>
      </head>
      <body className="my-6 flex">
        <div className="mx-auto">
          <CalendarIcon />
          <h1 className="text-center text-xl mb-2">
            <span className="text-red-500 font-bold">{caught.status}</span>
            <span className="text-red-400 font-bold"> {caught.statusText}</span>
          </h1>
          <p className="text-center font-bold">Oops! looks like this event does not exist!</p>
          <Link to={'/'}>
            <span className="block text-center text-blue-400"> go back to the Calendar...</span>
          </Link>
        </div>
      </body>
    </html>
  );
}

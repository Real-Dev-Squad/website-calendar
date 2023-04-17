import { LinksFunction } from '@remix-run/node';
import Navbar from '~/components/common/navbar';
import styles from '~/components/common/eventModal/styles.css';
import CalendarGrid from '~/components/calendar/calendarGrid';

export const links: LinksFunction = () => [{ rel: 'stylesheet', href: styles }];

export default function Index() {
  return (
    <div className="">
      <div className="flex flex-col-reverse md:flex-row ">
        <Navbar />
        <div className="w-full grid grid-cols-1 gap-2 h-screen overflow-y-scroll">
          <div className="w-full p-5">
            <CalendarGrid />
          </div>
        </div>
      </div>
    </div>
  );
}

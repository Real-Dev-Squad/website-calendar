import { LinksFunction } from '@remix-run/node';
import Navbar from '~/components/common/navbar';
import styles from '~/components/common/eventModal/styles.css';
import EventCard from '~/components/events/eventCard';

export const links: LinksFunction = () => [{ rel: 'stylesheet', href: styles }];

export default function Index() {
  return (
    <div className="">
      <div className="flex flex-col-reverse md:flex-row ">
        <Navbar />
        <div className="flex justify-center flex-grow p-5 items-start">
          <div className="w-full grid grid-cols-1 gap-2">
            <div className="w-full text-center text-grey-med">Events</div>
            <div className="w-full grid grid-cols-1 gap-2">
              <EventCard
                title={'Marketing meet with John'}
                dateFrom={'12:00 PM'}
                dateTo={'1:00 PM'}
                participants={['You', 'Harshith']}
              />
              <EventCard
                title={'Marketing meet with John'}
                dateFrom={'12:00 PM'}
                dateTo={'1:00 PM'}
                location={'Amsterdam'}
              />
              <EventCard
                title={'Marketing meet with John'}
                dateFrom={'12:00 PM'}
                dateTo={'1:00 PM'}
                meetLink={'https://github.com/Real-Dev-Squad/website-calendar'}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

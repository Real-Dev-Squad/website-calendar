import { LinksFunction } from '@remix-run/node';
import styles from 'react-datepicker/dist/react-datepicker.css';
import Calendar from '~/components/Calendar';
import Navbar from '~/components/common/navbar';
import { useBoundStore } from '~/store/eventSlice';

export const links: LinksFunction = () => [{ rel: 'stylesheet', href: styles }];

export default function Index() {
  const events = useBoundStore((state: { bears: any }) => state.events);
  console.log(events);

  return (
    <div className="">
      <div className="flex flex-col-reverse md:flex-row ">
        <Navbar />
        <div className="flex justify-center flex-grow">
          <Calendar />
        </div>
      </div>
    </div>
  );
}

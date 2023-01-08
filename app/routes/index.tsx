import { LinksFunction } from '@remix-run/node';
import Calendar from '~/components/Calendar';
import Navbar from '~/components/common/navbar';
import styles from '~/components/common/eventModal/styles.css';

export const links: LinksFunction = () => [{ rel: 'stylesheet', href: styles }];

export default function Index() {
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

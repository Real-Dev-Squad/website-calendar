import { Outlet } from '@remix-run/react';
import Calendar from '~/components/Calendar';
import Navbar from '~/components/common/navbar';
import { useStore } from '~/store/useStore';

function CalendarPage() {
  const { events, view } = useStore((state) => state);

  return (
    <div className="">
      <div className="flex flex-col-reverse md:flex-row ">
        <Navbar />
        <div className="flex justify-center flex-grow">
          <Calendar events={events} view={view} />
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default CalendarPage;

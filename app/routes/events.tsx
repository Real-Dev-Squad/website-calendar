import dayjs from 'dayjs';
import { useState } from 'react';
import Drawer from '~/components/common/drawer';
import Navbar from '~/components/common/navbar';
import EventCard from '~/components/common/eventCard';
import { CalEvent } from '~/utils/interfaces';
import { userEvents } from '~/constants/userEvents.constants';

const Events = () => {
  const [selectedEvent, setSelectedEvent] = useState<CalEvent | null>(null);
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);

  const toggleDrawer = (event?: CalEvent) => {
    setSelectedEvent(event || null);
    setIsDrawerVisible((isDrawerOpen) => !isDrawerOpen);
  };



  return (
    
      <main>
      <div className="">
      <div className="flex flex-col-reverse md:flex-row ">
        <Navbar />
        <div className="flex justify-center flex-grow p-5 items-start">
          <div className="w-full grid grid-cols-1 gap-2">
            <div className="w-full text-center text-grey-med">Events</div>
            <div className="w-full grid grid-cols-1 gap-2">
              {userEvents.map(eventData => <div onClick={() => toggleDrawer(eventData)}><EventCard {...eventData} /></div>)}
            </div>
          </div>
        </div>
      </div>
    </div>
        {selectedEvent && (
          <Drawer
            event={selectedEvent}
            isDrawerVisible={isDrawerVisible}
            toggleDrawer={toggleDrawer}
          />
        )}
      </main>
    
  );
};

export default Events;

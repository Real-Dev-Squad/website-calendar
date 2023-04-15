import { useState } from 'react';
import { initialEventsList } from '~/components/Calendar';
import Drawer from '~/components/common/drawer';
import { CalEvent } from '~/utils/interfaces';

const Events = () => {
  const [selectedEvent, setSelectedEvent] = useState<CalEvent | null>(null);
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);

  const toggleDrawer = (event?: CalEvent) => {
    setSelectedEvent(event || null);
    setIsDrawerVisible(!isDrawerVisible);
  };

  return (
    <div className="p-10">
      <main>
        {initialEventsList.map((event) => (
          <div
            key={event.id}
            className="shadow-xl min-w-fit w-1/3 max-w-lg px-6 pt-10 pb-9 rounded-2xl cursor-pointer my-20"
            onClick={() => toggleDrawer(event)}
          >
            <h2>{event.title}</h2>
            <p>You and John</p>
          </div>
        ))}
        {selectedEvent && (
          <Drawer
            event={selectedEvent}
            isDrawerVisible={isDrawerVisible}
            toggleDrawer={toggleDrawer}
          />
        )}
      </main>
    </div>
  );
};

export default Events;

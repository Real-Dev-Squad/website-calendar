import { useState } from 'react';
import Drawer from '~/components/common/drawer';
import SocialEventCard from '~/components/common/socialEventCard';
import Navbar from '~/components/common/navbar';
import { socialMockEvents } from '~/constants/socialEvents.constants';
import { CalEvent } from '~/utils/interfaces';

export default function socialEvents() {
  const [selectedEvent, setSelectedEvent] = useState<CalEvent | null>(null);
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);

  const toggleDrawer = (event?: CalEvent) => {
    setSelectedEvent(event || null);
    setIsDrawerVisible((isDrawerOpen) => !isDrawerOpen);
  };

  return (
    <>
      <div className="flex">
        <Navbar />
        <div className="flex flex-start flex-wrap gap-20 justify-center m-10">
          {socialMockEvents.map((socialEvent) => (
            <div
              onClick={() => {
                toggleDrawer(socialEvent);
              }}
              className=""
            >
              <SocialEventCard {...socialEvent} />
            </div>
          ))}
        </div>
        {selectedEvent && (
          <Drawer
            event={selectedEvent}
            isDrawerVisible={isDrawerVisible}
            toggleDrawer={toggleDrawer}
          />
        )}
      </div>
    </>
  );
}

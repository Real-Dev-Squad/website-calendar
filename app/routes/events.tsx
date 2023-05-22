import dayjs from 'dayjs';
import { useState } from 'react';
import Drawer from '~/components/common/drawer';
import { CalEvent } from '~/utils/interfaces';

const Events = () => {
  const [selectedEvent, setSelectedEvent] = useState<CalEvent | null>(null);
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);

  const toggleDrawer = (event?: CalEvent) => {
    setSelectedEvent(event || null);
    setIsDrawerVisible((isDrawerOpen) => !isDrawerOpen);
  };

  const dummyEvent: CalEvent[] = [
    {
      id: 1,
      title: 'timed event',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit amet luctus venenatis, lectus magna fringilla urna, porttitor rhoncus dolor purus non enim praesent elementum facilisis leo, vel.',
      location: 'Nashville, Tennessee. U.S.',
      start: dayjs().add(1, 'hour').toDate(),
      end: dayjs().add(2, 'hours').toDate(),
      visibility: 'private',
      attendees: [{ attendee: { email: 'a@b.c' } }, { attendee: { email: 'alpha@beta.gamma' } }],
    },
  ];

  return (
    <div className="p-10">
      <main>
        {dummyEvent.map((event) => (
          <div
            key={event.id}
            className="shadow-xl min-w-fit max-w-lg px-6 pt-10 pb-9 rounded-2xl cursor-pointer my-20"
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

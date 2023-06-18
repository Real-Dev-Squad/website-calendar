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
        {dummyEvent.map((event) => (<>
          {/* <div
            key={event.id}
            className="shadow-xl min-w-fit max-w-lg px-6 pt-10 pb-9 rounded-2xl cursor-pointer my-20"
            onClick={() => toggleDrawer(event)}
          >
            <h2>{event.title}</h2>
            <p>You and John</p>
          </div> */}
          <div className="absolute left-[calc(100%/3)] top-[calc(87px*2)] w-[calc(100%/3)] pr-2 h-[calc(87px*3)]">
      <div
        data-testid="event-box"
        className="w-full h-full rounded-xl px-3 py-2 bg-grey-light flex items-start gap-2"
        onClick={() => toggleDrawer(event)}
      >
        <div className="w-full  grid grid-cols-1 items-start gap-2">
          <div
            data-testid="event-name"
            className="text-md font-semibold text-grey-dark leading-5 truncate overflow-ellipsis"
          >
            {event.title}
          </div>
          <div data-testid="event-dates" className="w-full gap-1 flex items-center">
            <div className="text-xs text-grey-med">{event.start!.toString() ?? ''}</div>
            <div className="border-b-1 border-grey-med w-3"></div>
            <div className="text-xs text-grey-med">{event.end!.toString() ?? ''}</div>
          </div>
        </div>
      </div>
    </div>
          </>
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

import dayjs from 'dayjs';
import { useState } from 'react';
import Drawer from '~/components/common/drawer';
import EventCard from '~/components/common/eventCard';
import Navbar from '~/components/common/navbar';
import { dummyEvent } from '~/constants/events.constants';
import { CalEvent } from '~/utils/interfaces';

const startTime = dayjs().format('h:mm A');
const endTime = dayjs().add(2, 'hours').format('h:mm A');

export default function socialEvents() {
  const [selectedEvent, setSelectedEvent] = useState<CalEvent | null>(null);
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const dummyEvents = [{
    id: 1,
    title: 'stand up feature demo',
    start: dayjs('2023-06-01').add(1, 'hour').toDate(),
    end: dayjs('2023-06-01').add(2, 'hours').toDate(),
    visibility: 'public',
    attendees: [
      {
        attendee: {
          email: 'ankush@rcal.com',
        },
      },
      {
        attendee: {
          email: 'prakash@rcal.com',
        },
      },
      {
        attendee: {
          email: 'ritik@rcal.com',
        },
      },
      {
        attendee: {
          email: 'shreya@rcal.com',
        },
      },
    ],
  },
  {
    id: 1,
    title: 'Discord Bot Feature',
    description: 'Integration of verifying of users, providing users RDS specific roles',
    start: dayjs().add(1, 'hour').toDate(),
    end: dayjs().add(2, 'hours').toDate(),
    visibility: 'public',
    attendees: [
      {
        attendee: {
          email: 'ankush@rcal.com',
        },
      },
      {
        attendee: {
          email: 'prakash@rcal.com',
        },
      },
      {
        attendee: {
          email: 'shreya@rcal.com',
        },
      },
    ],
  }];

  const toggleDrawer = (event?: CalEvent) => {
    setSelectedEvent(event || null);
    setIsDrawerVisible((isDrawerOpen) => !isDrawerOpen);
  };

  return <>
  <div className='flex'>
    <Navbar />
    <div className='flex flex-start m-10'>
    {dummyEvents.map(dummyEvent => <div onClick={() => toggleDrawer(dummyEvent)} className="ml-10"><EventCard {...dummyEvent} /></div>)}
    </div>
    {selectedEvent && (
          <Drawer
            event={selectedEvent}
            isDrawerVisible={isDrawerVisible}
            toggleDrawer={toggleDrawer}
          />
        )}
  </div>
  </>;
}

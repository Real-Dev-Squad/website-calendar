import EventCard from '~/components/common/eventCard';
import moment from 'moment';

const startTime = moment().format('h:mm A');
const endTime = moment().add(2, 'hours').format('h:mm A');

export default function socialEvents() {
  const dummyEvent = {
    id: 11,
    name: 'React Day',
    description: 'SOME',
    location: 'sad',
    startTime: startTime,
    endTime: endTime,
    ownerId: 1,
    eventTypeId: 1,
    calendarId: 1,
    isDeleted: false,
    attendees: [
      {
        attendee: {
          email: 'samyak@rcal.com',
        },
      },
      {
        attendee: {
          email: 'samyak2@rcal.com',
        },
      },
      {
        attendee: {
          email: 'samyak3@rcal.com',
        },
      },
    ],
    eventType: {
      name: 'event',
    },
  };
  return <EventCard {...dummyEvent} />;
}

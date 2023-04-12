import EventCard from '~/components/common/eventCard';
import moment from 'moment';

const startTime = moment().format('h:mm A');
const endTime = moment().add(2, 'hours').format('h:mm A');

export default function socialEvents() {
  const dummyEvent = {
    id: 1,
    title: 'timed event',
    start: moment().add(1, 'hour').toDate(),
    end: moment().add(2, 'hours').toDate(),
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
  };
  return <EventCard {...dummyEvent} />;
}

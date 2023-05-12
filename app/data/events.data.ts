import moment from 'moment';
import { CalEvent } from '~/utils/interfaces';

export const mockEvents: CalEvent[] = [
  {
    id: 1,
    title: 'timed event',
    start: moment().add(1, 'hour').toDate(),
    end: moment().add(2, 'hours').toDate(),
    description: '',
    location: '',
    visibility: 'private',
    attendees: [{ attendee: { email: 'a@b.c' } }, { attendee: { email: 'alpha@beta.gamma' } }],
  },
  {
    id: 2,
    title: 'Some title',
    start: moment().add(1, 'day').toDate(),
    end: moment().add(1, 'day').add(2, 'hour').toDate(),
    description: '',
    location: '',
    visibility: 'public',
    attendees: [
      { attendee: { email: 'alpha@beta.gamma' } },
      { attendee: { email: 'admin@rds.com' } },
    ],
  },
  {
    id: 3,
    title: 'Another title',
    start: moment().add(1, 'day').add(8, 'hours').toDate(),
    end: moment().add(1, 'day').add(9, 'hours').toDate(),
    description: '',
    location: '',
    visibility: 'private',
    attendees: [{ attendee: { email: 'admin@rds.com' } }],
  },
];

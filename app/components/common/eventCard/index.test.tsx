import { render, screen } from '@testing-library/react';
import EventCard from './index';

const event = {
  id: 1,
  name: 'Example Event',
  description: 'This is an example event',
  location: 'Example location',
  startTime: '2023-03-17T12:00:00.000Z',
  endTime: '2023-03-17T13:30:00.000Z',
  ownerId: 2,
  eventTypeId: 3,
  calendarId: 4,
  isDeleted: false,
  attendees: [
    {
      attendee: {
        email: 'example1@example.com',
      },
    },
    {
      attendee: {
        email: 'example2@example.com',
      },
    },
  ],
  eventType: {
    name: 'Example Type',
  },
};

describe('EventCard', () => {
  test('renders the number of participants', () => {
    render(<EventCard {...event} />);
    const count = screen.getByText(`${event.attendees.length} Participants`);
    expect(count).toBeInTheDocument();
  });

  test('renders the event title', () => {
    render(<EventCard {...event} />);
    const title = screen.getByText(event.name);
    expect(title).toBeInTheDocument();
  });

  test('renders the date and month', () => {
    render(<EventCard {...event} />);
    const date = screen.getByText('30');
    const month = screen.getByText('AUG');
    expect(date).toBeInTheDocument();
    expect(month).toBeInTheDocument();
  });

  test('renders the start and end time', () => {
    render(<EventCard {...event} />);
    const startTime = screen.getByText('12AM to 1:30AM');
    expect(startTime).toBeInTheDocument();
  });
});

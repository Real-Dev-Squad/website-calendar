import { render, screen } from '@testing-library/react';
import EventCard from '.';

it('renders the event card', () => {
  render(<EventCard title={'Marketing meet with John'} dateFrom={'12:00 PM'} dateTo={'1:00 PM'} />);

  const eventCardBox = screen.getByTestId('event-card-box');
  const eventCardDates = screen.getByTestId('event-card-dates');
  const eventCardContent = screen.getByTestId('event-card-content');
  const eventCardTitle = screen.getByTestId('event-card-title');

  expect(eventCardBox).toBeInTheDocument();
  expect(eventCardDates).toBeInTheDocument();
  expect(eventCardContent).toBeInTheDocument();
  expect(eventCardTitle).toBeInTheDocument();
});

it('renders the event card participants', () => {
  render(
    <EventCard
      title={'Marketing meet with John'}
      dateFrom={'12:00 PM'}
      dateTo={'1:00 PM'}
      participants={['You', 'Harshith']}
    />,
  );
  const eventCardParticipants = screen.getByTestId('event-card-participants');
  expect(eventCardParticipants).toBeInTheDocument();
});

it('renders the event card location', () => {
  render(
    <EventCard
      title={'Marketing meet with John'}
      dateFrom={'12:00 PM'}
      dateTo={'1:00 PM'}
      location={'Amsterdam'}
    />,
  );
  const eventCardLocation = screen.getByTestId('event-card-location');
  expect(eventCardLocation).toBeInTheDocument();
});

it('renders the event card meet', () => {
  render(
    <EventCard
      meetLink={'https://github.com/Real-Dev-Squad/website-calendar'}
      title={'Marketing meet with John'}
      dateFrom={'12:00 PM'}
      dateTo={'1:00 PM'}
    />,
  );
  const eventCardMeet = screen.getByTestId('event-card-meet');
  expect(eventCardMeet).toBeInTheDocument();
});

it('renders the event card no details', () => {
  render(<EventCard title={'Marketing meet with John'} dateFrom={'12:00 PM'} dateTo={'1:00 PM'} />);
  const eventCardNoDetails = screen.getByTestId('event-card-no-details');
  expect(eventCardNoDetails).toBeInTheDocument();
});

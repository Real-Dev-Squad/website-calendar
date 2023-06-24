import { render, screen } from '@testing-library/react';
import EventCard from '.';



it('renders the event card', () => {
  render(<EventCard title={'Marketing meet with John'} start={new Date()} end={new Date(new Date().setHours(new Date().getHours() + 2))} />);

  const eventCardBox = screen.getByTestId('event-card-box');
  const eventCardDates = screen.getByTestId('event-card-dates');
  const eventCardContent = screen.getByTestId('event-card-content');
  const eventCardTitle = screen.getByTestId('event-card-title');

  expect(eventCardBox).toBeInTheDocument();
  expect(eventCardDates).toBeInTheDocument();
  expect(eventCardContent).toBeInTheDocument();
  expect(eventCardTitle).toBeInTheDocument();
});

it('renders the event card attendees', () => {
  render(
    <EventCard
      title={'Marketing meet with John'}
      start={new Date()}
      end={new Date(new Date().setHours(new Date().getHours() + 2))}
      attendees={[{attendee: {email: 'test1@abc.com'}}, {attendee: {email: 'test2@abc.com'}}]}
    />,
  );
  const eventCardattendees = screen.getByTestId('event-card-attendees');
  expect(eventCardattendees).toBeInTheDocument();
});

it('renders the event card location', () => {
  render(
    <EventCard
      title={'Marketing meet with John'}
      start={new Date()}
      end={new Date(new Date().setHours(new Date().getHours() + 2))}
      location={'Amsterdam'}
    />,
  );
  const eventCardLocation = screen.getByTestId('event-card-location');
  expect(eventCardLocation).toBeInTheDocument();
});

// TODO: fix issue useHref() may be used only in the context of a <Router> component.
// it('renders the event card meet', () => {
//   render(
//     <EventCard
//       meetLink={'https://github.com/Real-Dev-Squad/website-calendar'}
//       title={'Marketing meet with John'}
//       start={new Date()}
//       end={new Date(new Date().setHours(new Date().getHours() + 2))}
//     />,
//   );
//   const eventCardMeet = screen.getByTestId('event-card-meet');
//   expect(eventCardMeet).toBeInTheDocument();
// });

it('renders the event card no details', () => {
  render(<EventCard title={'Marketing meet with John'} start={new Date()}
  end={new Date(new Date().setHours(new Date().getHours() + 2))} />);
  const eventCardNoDetails = screen.getByTestId('event-card-no-details');
  expect(eventCardNoDetails).toBeInTheDocument();
});
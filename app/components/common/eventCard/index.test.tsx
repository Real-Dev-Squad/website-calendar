import { render, screen } from '@testing-library/react';
import EventCard from './index';

describe('EventCard', () => {
  const eventDetails = {
    date: 15,
    month: 'March',
    fromTime: '9:00 AM',
    toTime: '11:00 AM',
  };
  const eventTitle = 'Test Event';
  const participantCount = 3;

  it('should render the event details correctly', () => {
    render(
      <EventCard
        eventDetails={eventDetails}
        eventTitle={eventTitle}
        participantCount={participantCount}
      />
    );

    expect(screen.getByText(eventDetails.date)).toBeInTheDocument();
    expect(screen.getByText(eventDetails.month)).toBeInTheDocument();
    expect(
      screen.getByText(`${eventDetails.fromTime} to ${eventDetails.toTime}`)
    ).toBeInTheDocument();
    expect(screen.getByText(eventTitle)).toBeInTheDocument();
    expect(screen.getByText(`${participantCount} Participants`)).toBeInTheDocument();
  });
});

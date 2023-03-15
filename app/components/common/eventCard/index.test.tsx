import { render, screen } from '@testing-library/react';
import EventCard from './index';
import { eventDetails } from './utils/eventDetailsObject';

describe('EventCard', () => {
  it('should render event details correctly', () => {
    const props = {
      eventDetails: eventDetails,
      eventTitle: 'Test Event',
      participantCount: 3,
    };
    render(<EventCard {...props} />);
    expect(screen.getByText(props.eventTitle)).toBeInTheDocument();
    expect(screen.getByText(props.eventDetails.date)).toBeInTheDocument();
    expect(screen.getByText(props.eventDetails.month)).toBeInTheDocument();
    expect(screen.getByText(props.eventDetails.fromTime)).toBeInTheDocument();
    expect(screen.getByText(props.eventDetails.toTime)).toBeInTheDocument();
    expect(screen.getByText(props.participantCount)).toBeInTheDocument();
  });

  it('should display "Untitled Event" if event title is an empty string', () => {
    const props = {
      eventDetails: eventDetails,
      eventTitle: '',
      participantCount: 3,
    };
    render(<EventCard {...props} />);
    const eventTitle = screen.getByText(/Untitled Event/i);
    expect(eventTitle).toBeInTheDocument();
  });

  it('should display "0" if participant count is negative', () => {
    const props = {
      eventDetails: eventDetails,
      eventTitle: 'Test Event',
      participantCount: -3,
    };
    render(<EventCard {...props} />);
    const participantCount = screen.getByText('0');
    expect(participantCount).toBeInTheDocument();
  });
});

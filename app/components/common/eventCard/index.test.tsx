import { render, screen } from '@testing-library/react';
import EventCard from './index';

describe('EventCard', () => {
  it('should render event details correctly', () => {
    const props = {
      date: 15,
      month: 'March',
      fromTime: '12AM',
      toTime: '1:30PM',
      eventTitle: 'Test Event',
      participantCount: 3,
    };
    render(<EventCard {...props} />);
    expect(screen.getByText(props.date)).toBeInTheDocument();
    expect(screen.getByText(props.month)).toBeInTheDocument();
    expect(screen.getByText(props.fromTime)).toBeInTheDocument();
    expect(screen.getByText(props.toTime)).toBeInTheDocument();
    expect(screen.getByText(props.eventTitle)).toBeInTheDocument();
    expect(screen.getByText(props.participantCount)).toBeInTheDocument();
  });

  it('should display "Untitled Event" if event title is an empty string', () => {
    const props = {
      date: 15,
      month: 'March',
      fromTime: '12AM',
      toTime: '1:30PM',
      eventTitle: '',
      participantCount: 3,
    };
    render(<EventCard {...props} />);
    const eventTitle = screen.getByText(/Untitled Event/i);
    expect(eventTitle).toBeInTheDocument();
  });

  it('should display "0" if participant count is negative', () => {
    const props = {
      date: 15,
      month: 'March',
      fromTime: '12AM',
      toTime: '1:30PM',
      eventTitle: 'Test Event',
      participantCount: -3,
    };
    render(<EventCard {...props} />);
    const participantCount = screen.getByText('0');
    expect(participantCount).toBeInTheDocument();
  });
});

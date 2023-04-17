import { render, screen } from '@testing-library/react';
import CalendarEventCard from '.';

describe('render event', () => {
  it('renders a input field', () => {
    render(<CalendarEventCard />);

    const eventBox = screen.getByTestId('event-box');
    const eventName = screen.getByTestId('event-name');
    const eventDates = screen.getByTestId('event-dates');

    expect(eventBox).toBeInTheDocument();
    expect(eventName).toBeInTheDocument();
    expect(eventDates).toBeInTheDocument();
  });
});

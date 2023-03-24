import { render } from '@testing-library/react';
import { GoogleCalendar } from '../GoogleCalendar';

describe('GoogleCalendar', () => {
  it('should render GoogleCalendar svg icon', () => {
    const { container } = render(<GoogleCalendar />);
    expect(container).toBeInTheDocument();
  });
});

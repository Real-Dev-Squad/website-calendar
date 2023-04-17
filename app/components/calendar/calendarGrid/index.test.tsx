import { render, screen } from '@testing-library/react';
import CalendarGrid from '.';

describe('render grid', () => {
  it('renders a input field', () => {
    render(<CalendarGrid />);

    const gridBox = screen.getByTestId('grid-box');
    const gridEvents = screen.getByTestId('grid-events');

    expect(gridBox).toBeInTheDocument();
    expect(gridEvents).toBeInTheDocument();
  });
});

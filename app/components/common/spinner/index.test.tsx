import { render, screen } from '@testing-library/react';
import dayjs from 'dayjs';
import Rspinner from './index';

describe('Rspinner', () => {
  it('should render without crashing', () => {
    render(<Rspinner />);
    expect(screen.getByTestId('spinner-container')).toBeInTheDocument();
  });

  it("should display today's date", () => {
    const today = dayjs().date();
    render(<Rspinner />);
    expect(screen.getByText(today)).toBeInTheDocument();
  });

  it('should have animation delays on loading dots', () => {
    render(<Rspinner />);
    const dots = screen.getAllByTestId('loading-dot');
    expect(dots[0]).toHaveStyle('animation-delay: 0s');
    expect(dots[1]).toHaveStyle('animation-delay: 0.3s');
    expect(dots[2]).toHaveStyle('animation-delay: 0.6s');
  });
});

import { render, screen } from '@testing-library/react';
import EventVisibility, { EventVisibilityProps } from './index';

describe('EventVisibility Component', () => {
  it('should display "Public" and the globe icon when visibility is public', () => {
    const props: EventVisibilityProps = {
      visibility: 'public',
    };

    render(<EventVisibility {...props} />);

    expect(screen.getByText('Public')).toBeInTheDocument();
    expect(screen.getByTestId('globe-icon')).toBeInTheDocument();
  });

  it('should display "Private" and the lock icon when visibility is private', () => {
    const props: EventVisibilityProps = {
      visibility: 'private',
    };

    render(<EventVisibility {...props} />);

    expect(screen.getByText('Private')).toBeInTheDocument();
    expect(screen.getByTestId('lock-icon')).toBeInTheDocument();
  });
});

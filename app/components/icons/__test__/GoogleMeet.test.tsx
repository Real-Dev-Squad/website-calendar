import { render } from '@testing-library/react';
import { GoogleMeet } from '../GoogleMeet';

describe('GoogleMeet', () => {
  it('should render GoogleMeet svg icon', () => {
    const { container } = render(<GoogleMeet />);
    expect(container).toBeInTheDocument();
  });
});

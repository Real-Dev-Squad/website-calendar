import { render } from '@testing-library/react';
import { Microsoft } from '../Microsoft';

describe('Microsoft', () => {
  it('should render Microsoft svg icon', () => {
    const { container } = render(<Microsoft />);
    expect(container).toBeInTheDocument();
  });
});

import { render } from '@testing-library/react';

import { Google } from '../Google';

describe('Google', () => {
  it('should render Google svg icon', () => {
    const { container } = render(<Google />);
    expect(container).toBeInTheDocument();
  });
});

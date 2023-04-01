import { render } from '@testing-library/react';
import { MicrosoftCalendar } from '../MicrosoftCalendar';

describe('MicrosoftCalendar', () => {
  it('should render MicrosoftCalendar svg icon', () => {
    const { container } = render(<MicrosoftCalendar />);
    expect(container).toBeInTheDocument();
  });
});

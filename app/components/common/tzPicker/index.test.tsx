import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import TzPicker from './index';

let isClientMockValue = true;

jest.mock('../../../hooks/isClient', () => ({
  __esModule: true,
  default: () => isClientMockValue,
}));

jest.mock('react-timezone-select', () => ({
  __esModule: true,
  default: (props: any) => (
    <div
      data-testid="mocked-timezone-select"
      onClick={() => props.onChange({ label: 'Your timezone value here' })}
    ></div>
  ),
}));

describe('<TzPicker />', () => {
  it('renders the placeholder text', () => {
    render(<TzPicker placeholder="Test Placeholder" setUserTimezone={jest.fn()} />);
    expect(screen.getByTestId('mocked-timezone-select')).toBeInTheDocument();
  });

  it('renders TimezoneSelect when client-side', () => {
    isClientMockValue = true;
    render(<TzPicker placeholder="Test Placeholder" setUserTimezone={jest.fn()} />);
    expect(screen.getByTestId('mocked-timezone-select')).toBeInTheDocument();
  });

  it('renders the empty border when server-side', () => {
    isClientMockValue = false;
    render(<TzPicker placeholder="Test Placeholder" setUserTimezone={jest.fn()} />);
    expect(screen.getByTestId('empty-border')).toBeInTheDocument();
  });

  it('updates timezone on TimezoneSelect change', () => {
    isClientMockValue = true;

    const mockSetUserTimezone = jest.fn();

    render(<TzPicker placeholder="Test Placeholder" setUserTimezone={mockSetUserTimezone} />);

    const timezoneComponent = screen.getByTestId('mocked-timezone-select');
    fireEvent.click(timezoneComponent);

    expect(mockSetUserTimezone).toHaveBeenCalled();
  });
});

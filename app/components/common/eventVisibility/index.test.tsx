import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import EventVisibility from '.';

describe('EventVisibility', () => {
  test('renders with public visibility', () => {
    const setVisibility = jest.fn();
    render(<EventVisibility visibility="public" setVisibility={setVisibility} />);
    expect(screen.getByText('Public')).toBeInTheDocument();
  });

  test('renders with private visibility', () => {
    const setVisibility = jest.fn();
    render(<EventVisibility visibility="private" setVisibility={setVisibility} />);
    expect(screen.getByText('Private')).toBeInTheDocument();
  });

  test('toggles visibility from public to private when clicked', async () => {
    const setVisibilityMock = jest.fn();
    render(<EventVisibility visibility="public" setVisibility={setVisibilityMock} />);
    const button = screen.getByRole('button');
    userEvent.click(button);
    await waitFor(() => expect(setVisibilityMock).toHaveBeenCalledTimes(1));
    expect(setVisibilityMock).toHaveBeenCalledWith('private');
  });

  test('toggles visibility from private to public when clicked', async () => {
    const setVisibilityMock = jest.fn();
    render(<EventVisibility visibility="private" setVisibility={setVisibilityMock} />);
    const button = screen.getByRole('button');
    userEvent.click(button);
    await waitFor(() => expect(setVisibilityMock).toHaveBeenCalledTimes(1));
    expect(setVisibilityMock).toHaveBeenCalledWith('public');
  });

  test('renders the correct icon for public visibility', () => {
    const setVisibility = jest.fn();
    render(<EventVisibility visibility="public" setVisibility={setVisibility} />);
    expect(screen.getByTestId('globe-icon')).toBeInTheDocument();
  });

  test('renders the correct icon for private visibility', () => {
    const setVisibility = jest.fn();
    render(<EventVisibility visibility="private" setVisibility={setVisibility} />);
    expect(screen.getByTestId('lock-icon')).toBeInTheDocument();
  });
});

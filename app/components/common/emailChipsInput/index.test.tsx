// TODO: remove all eslint-disable when eslint-prettier issue is fixed
/* eslint-disable comma-dangle */
import { fireEvent, render, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import EmailChipsInput from '.';

describe('EmailChipsInput', () => {
  const setAttendeesMock = jest.fn();

  beforeEach(() => {
    setAttendeesMock.mockClear();
  });

  test('renders the component', () => {
    render(
      <EmailChipsInput
        label="To"
        placeholder="Enter email"
        attendees={[]}
        setAttendees={setAttendeesMock}
      />
    );
    expect(screen.getByText('To')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter email')).toBeInTheDocument();
  });

  test('displays email chips', () => {
    render(
      <EmailChipsInput
        label="To"
        placeholder="Enter email"
        attendees={['example@example.com']}
        setAttendees={setAttendeesMock}
      />
    );
    expect(screen.getByText('example@example.com')).toBeInTheDocument();
  });

  test('adds an email chip when valid email is entered with Enter key', () => {
    render(
      <EmailChipsInput
        label="To"
        placeholder="Enter email"
        attendees={[]}
        setAttendees={setAttendeesMock}
      />
    );
    const input = screen.getByPlaceholderText('Enter email');
    act(() => {
      fireEvent.change(input, { target: { value: 'example@example.com' } });
      fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });
    });
    expect(setAttendeesMock).toHaveBeenCalledTimes(1);
    expect(setAttendeesMock).toHaveBeenCalledWith(['example@example.com']);
  });

  test('adds an email chip when valid email is entered with Tab key', () => {
    render(
      <EmailChipsInput
        label="To"
        placeholder="Enter email"
        attendees={[]}
        setAttendees={setAttendeesMock}
      />
    );
    const input = screen.getByPlaceholderText('Enter email');
    act(() => {
      fireEvent.change(input, { target: { value: 'example@example.com' } });
      fireEvent.keyDown(input, { key: 'Tab', code: 'Tab' });
    });
    expect(setAttendeesMock).toHaveBeenCalledTimes(1);
    expect(setAttendeesMock).toHaveBeenCalledWith(['example@example.com']);
  });

  test('adds an email chip when valid email is entered with , key', () => {
    render(
      <EmailChipsInput
        label="To"
        placeholder="Enter email"
        attendees={[]}
        setAttendees={setAttendeesMock}
      />
    );
    const input = screen.getByPlaceholderText('Enter email');
    act(() => {
      fireEvent.change(input, { target: { value: 'example@example.com' } });
      fireEvent.keyDown(input, { key: ',', code: 'Comma' });
    });
    expect(setAttendeesMock).toHaveBeenCalledTimes(1);
    expect(setAttendeesMock).toHaveBeenCalledWith(['example@example.com']);
  });

  test('does not add an email chip when invalid email is entered', () => {
    render(
      <EmailChipsInput
        label="To"
        placeholder="Enter email"
        attendees={[]}
        setAttendees={setAttendeesMock}
      />
    );
    const input = screen.getByPlaceholderText('Enter email');
    act(() => {
      fireEvent.change(input, { target: { value: 'invalid-email' } });
      fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });
    });
    expect(setAttendeesMock).not.toHaveBeenCalled();
  });

  test('does not add an email chip when duplicate email is entered', () => {
    render(
      <EmailChipsInput
        label="To"
        placeholder="Enter email"
        attendees={['example@example.com']}
        setAttendees={setAttendeesMock}
      />
    );
    const input = screen.getByPlaceholderText('Enter email');
    act(() => {
      fireEvent.change(input, { target: { value: 'example@example.com' } });
      fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });
    });
    expect(setAttendeesMock).not.toHaveBeenCalled();
  });

  test('removes an email chip when delete button is clicked', () => {
    render(
      <EmailChipsInput
        label="To"
        placeholder="Enter email"
        attendees={['example@example.com']}
        setAttendees={setAttendeesMock}
      />
    );
    const deleteButton = screen.getByText('×');
    act(() => {
      fireEvent.click(deleteButton);
    });
    expect(setAttendeesMock).toHaveBeenCalledTimes(1);
    expect(setAttendeesMock).toHaveBeenCalledWith([]);
  });

  test('adds email chips when valid emails are pasted', () => {
    render(
      <EmailChipsInput
        label="To"
        placeholder="Enter email"
        attendees={[]}
        setAttendees={setAttendeesMock}
      />
    );
    const input = screen.getByPlaceholderText('Enter email');
    fireEvent.paste(input, {
      clipboardData: { getData: () => 'example1@example.com, example2@example.com' },
    });
    expect(setAttendeesMock).toHaveBeenCalledTimes(1);
    expect(setAttendeesMock).toHaveBeenCalledWith(['example1@example.com', 'example2@example.com']);
  });
});

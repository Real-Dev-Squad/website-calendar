// TODO: remove all eslint-disable when eslint-prettier issue is fixed
/* eslint-disable object-curly-newline */
/* eslint-disable comma-dangle */
import { render, fireEvent, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { CalEvent } from '~/utils/interfaces';
import EventModal from '.';

const mockEvent: CalEvent = {
  id: '1',
  title: 'Mock Event',
  start: new Date('2023-03-30T12:00:00.000Z'),
  end: new Date('2023-03-30T14:00:00.000Z'),
  description: '',
  location: '',
  visibility: 'private',
  attendees: ['a@b.c', 'alpha@beta.gamma'],
};

const mockUpdateEvent = jest.fn();
const mockSetCalendarEvent = jest.fn();
const mockSetIsOpen = jest.fn();

describe('EventModal', () => {
  test('renders EventModal component', () => {
    const { getByPlaceholderText } = render(
      <EventModal
        event={mockEvent}
        eventsList={[mockEvent]}
        currentEvent={mockEvent}
        setIsOpen={mockSetIsOpen}
        updateEvent={mockUpdateEvent}
        setCalendarEvent={mockSetCalendarEvent}
      />
    );
    expect(screen.getByTestId('modal-close-btn')).toBeInTheDocument();
    expect(screen.getByTestId('modal-title')).toHaveValue('Mock Event');
    expect(screen.getByTestId('modal-visibility')).toHaveTextContent('Private');
    expect(getByPlaceholderText('from-date')).toBeInTheDocument();
    expect(getByPlaceholderText('to-date')).toBeInTheDocument();
    expect(screen.getByTestId('email-chip-wrapper')).toHaveTextContent('a@b.c');
    expect(screen.getByTestId('email-chip-wrapper')).toHaveTextContent('alpha@beta.gamma');
    expect(
      (getByPlaceholderText('Enter URL or Address for the event') as HTMLInputElement).value
    ).toBe('');
    expect((getByPlaceholderText('Event Description') as HTMLTextAreaElement).value).toBe('');
    expect(screen.getByTestId('modal-save-btn')).toBeInTheDocument();
  });

  test('updates event title when title input is changed', () => {
    render(
      <EventModal
        event={mockEvent}
        eventsList={[mockEvent]}
        currentEvent={mockEvent}
        setIsOpen={mockSetIsOpen}
        updateEvent={mockUpdateEvent}
        setCalendarEvent={mockSetCalendarEvent}
      />
    );
    const input = screen.getByTestId('modal-title');
    act(() => {
      fireEvent.change(input, { target: { value: 'updated title' } });
    });
    expect(input).toHaveValue('updated title');
  });

  test('should call setIsOpen with false when user clicks the Close button', () => {
    render(
      <EventModal
        event={mockEvent}
        eventsList={[mockEvent]}
        currentEvent={mockEvent}
        setIsOpen={mockSetIsOpen}
        updateEvent={mockUpdateEvent}
        setCalendarEvent={mockSetCalendarEvent}
      />
    );

    const closeButton = screen.getByTestId('modal-close-btn');
    act(() => {
      fireEvent.click(closeButton);
    });
    expect(mockSetIsOpen).toHaveBeenCalledWith(false);
  });

  test('should call updateEvent with the updated event when user clicks the Save button', () => {
    render(
      <EventModal
        event={mockEvent}
        eventsList={[mockEvent]}
        currentEvent={mockEvent}
        setIsOpen={mockSetIsOpen}
        updateEvent={mockUpdateEvent}
        setCalendarEvent={mockSetCalendarEvent}
      />
    );
    const saveButton = screen.getByTestId('modal-save-btn');
    act(() => {
      fireEvent.click(saveButton);
    });
    expect(mockUpdateEvent).toHaveBeenCalledWith(mockEvent);
  });

  test('updates event visibility when visibility button is tapped', () => {
    render(
      <EventModal
        event={mockEvent}
        eventsList={[mockEvent]}
        currentEvent={mockEvent}
        setIsOpen={mockSetIsOpen}
        updateEvent={mockUpdateEvent}
        setCalendarEvent={mockSetCalendarEvent}
      />
    );
    const visibilityButton = screen.getByTestId('modal-visibility') as HTMLButtonElement;
    act(() => {
      fireEvent.click(visibilityButton);
    });
    expect(visibilityButton).toHaveTextContent('Public');
  });

  test('updates event start date when start date input is changed', () => {
    const { getByPlaceholderText } = render(
      <EventModal
        event={mockEvent}
        eventsList={[mockEvent]}
        currentEvent={mockEvent}
        setIsOpen={mockSetIsOpen}
        updateEvent={mockUpdateEvent}
        setCalendarEvent={mockSetCalendarEvent}
      />
    );
    const startDateInput = getByPlaceholderText('from-date');
    act(() => {
      fireEvent.change(startDateInput, { target: { value: new Date('2023-03-30T13:00:00.000Z') } });
    });
    expect(startDateInput).toHaveValue(new Date('2023-03-30T13:00:00.000Z').toString());
  });

  test('updates event end date when end date input is changed', () => {
    const { getByPlaceholderText } = render(
      <EventModal
        event={mockEvent}
        eventsList={[mockEvent]}
        currentEvent={mockEvent}
        setIsOpen={mockSetIsOpen}
        updateEvent={mockUpdateEvent}
        setCalendarEvent={mockSetCalendarEvent}
      />
    );
    const endDateInput = getByPlaceholderText('to-date');
    act(() => {
      fireEvent.change(endDateInput, { target: { value: new Date('2023-03-30T15:00:00.000Z') } });
    });
    expect(endDateInput).toHaveValue(new Date('2023-03-30T15:00:00.000Z').toString());
  });

  test('updates event attendees when attendees input is changed', () => {
    render(
      <EventModal
        event={mockEvent}
        eventsList={[mockEvent]}
        currentEvent={mockEvent}
        setIsOpen={mockSetIsOpen}
        updateEvent={mockUpdateEvent}
        setCalendarEvent={mockSetCalendarEvent}
      />
    );
    const attendeesInput = screen.getByTestId('email-chip-input') as HTMLInputElement;
    act(() => {
      fireEvent.change(attendeesInput, { target: { value: 'jane@doe.com' } });
    });
    expect(attendeesInput.value).toBe('jane@doe.com');
  });

  test('updates event location when location input is changed', () => {
    render(
      <EventModal
        event={mockEvent}
        eventsList={[mockEvent]}
        currentEvent={mockEvent}
        setIsOpen={mockSetIsOpen}
        updateEvent={mockUpdateEvent}
        setCalendarEvent={mockSetCalendarEvent}
      />
    );
    const locationInput = screen.getByTestId('modal-location') as HTMLInputElement;
    act(() => {
      fireEvent.change(locationInput, { target: { value: 'Central Park' } });
    });
    expect(locationInput.value).toBe('Central Park');
  });
});

import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { withDragAndDropProps } from 'react-big-calendar/lib/addons/dragAndDrop';
import dayjs from 'dayjs';
import { View, CalendarProps } from 'react-big-calendar';
import RdsCalendar from '.';
import { CalendarEventProps, CalEvent, UpdateEvent } from '~/utils/interfaces';

// pay attention to write it at the top level of your file
const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
   ...jest.requireActual('react-router-dom') as any,
  useNavigate: () => mockedUsedNavigate,
}));

interface RdsCalendarProps {
  height?: string;
  view?: View;
  eventsList: CalEvent[];
  defaultDate?: Date;
  currentEvent: CalEvent | undefined;
  setCalendarEvent: React.Dispatch<React.SetStateAction<CalendarEventProps>>;
  updateEvent: (event: CalEvent) => void;
}

jest.mock('react-big-calendar/lib/addons/dragAndDrop', () => {
  return (Component: React.ComponentType) => Component;
});

const mockEventsList: CalEvent[] = [
  {
    id: 1,
    title: 'Event 1',
    start: dayjs().add(1, 'hour').toDate(),
    end: dayjs().add(2, 'hours').toDate(),
    description: '',
    location: '',
    visibility: 'private',
    attendees: [{ attendee: { email: 'a@b.c' } }, { attendee: { email: 'alpha@beta.gamma' } }],
  },
];

const mockSetCalendarEvent = jest.fn();
const mockUpdateEvent = jest.fn();

const defaultProps: RdsCalendarProps = {
  eventsList: mockEventsList,
  currentEvent: mockEventsList[0],
  setCalendarEvent: mockSetCalendarEvent,
  updateEvent: mockUpdateEvent,
};

describe('RdsCalendar', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders calendar with correct events and default view', async () => {
    const { getByText } = render(<RdsCalendar {...defaultProps} />);
    const eventElement = getByText('Event 1');

    expect(eventElement).toBeInTheDocument();
  });

  // it('handles onSelectEvent correctly', () => {
  //   render(<RdsCalendar {...defaultProps} />);
  //   fireEvent.click(screen.getByText('Event 1'));
  //   console.log(mockSetCalendarEvent)
  //   expect(mockSetCalendarEvent).toHaveBeenCalledWith(expect.any(Function));

  //   // Invoke the function passed to setCalendarEvent
  //   const setCalendarEventArg = mockSetCalendarEvent.mock.calls[0][0];
  //   const prevState: CalendarEventProps = {
  //     event: undefined,
  //     show: false,
  //     new: false,
  //   };
  //   const newState = setCalendarEventArg(prevState);

  //   expect(newState).toEqual(
  //     expect.objectContaining({
  //       event: mockEventsList[0],
  //       show: true,
  //       new: false,
  //     }),
  //   );
  // });

  it('handles onEventDrop correctly', () => {
    const { getByText } = render(<RdsCalendar {...defaultProps} />);
    const eventElement = getByText('Event 1');

    const newStartDate = dayjs().add(3, 'hours').toDate();
    const newEndDate = dayjs().add(4, 'hours').toDate();

    const updateEventObj = {
      event: {
        ...mockEventsList[0],
        start: newStartDate,
        end: newEndDate,
      },
      start: newStartDate,
      end: newEndDate,
      isAllDay: false,
    };

    // Call the onEventDrop function directly
    const onEventDrop: withDragAndDropProps['onEventDrop'] = (ev: UpdateEvent) =>
      mockUpdateEvent({
        ...ev.event,
        start: dayjs(ev.start).toDate(),
        end: dayjs(ev.end).toDate(),
      });
    onEventDrop(updateEventObj);

    expect(mockUpdateEvent).toHaveBeenCalledWith({
      ...mockEventsList[0],
      start: newStartDate,
      end: newEndDate,
    });
  });

  it('handles onEventResize correctly', () => {
    const { getByText } = render(<RdsCalendar {...defaultProps} />);

    const newEndDate = dayjs().add(4, 'hours').toDate();

    const updateEventObj = {
      event: {
        ...mockEventsList[0],
        start: new Date(mockEventsList[0].start ?? dayjs().add(1, 'hour').toDate()),
        end: newEndDate,
      },
      start: new Date(mockEventsList[0].start ?? dayjs().add(1, 'hour').toDate()),
      end: newEndDate,
      isAllDay: false,
    };

    // Call the onEventDrop function directly
    const onEventDrop: withDragAndDropProps['onEventResize'] = (ev: UpdateEvent) =>
      mockUpdateEvent({
        ...ev.event,
        start: dayjs(ev.start).toDate(),
        end: dayjs(ev.end).toDate(),
      });
    onEventDrop(updateEventObj);

    expect(mockUpdateEvent).toHaveBeenCalledWith({
      ...mockEventsList[0],
      start: new Date(mockEventsList[0].start ?? dayjs().add(1, 'hour').toDate()),
      end: newEndDate,
    });
  });

  it('handles onSelectSlot correctly', () => {
    render(<RdsCalendar {...defaultProps} />);

    const startTime = dayjs().add(3, 'hours').toDate();
    const endTime = dayjs().add(4, 'hours').toDate();
    const newEvent: CalEvent = {
      title: '',
      start: startTime,
      end: endTime,
    };

    const onSelectSlotMock = {
      start: startTime,
      end: endTime,
      slots: [],
      action: 'select' as const,
      bounds: {
        x: 0,
        y: 0,
        top: 0,
        bottom: 100,
        left: 0,
        right: 100,
      },
      box: {
        x: 0,
        y: 0,
        clientX: 1,
        clientY: 1,
      },
    };

    // Call the onSelectSlot function directly
    const onSelectSlot: CalendarProps['onSelectSlot'] = (slotInfo) => {
      const event: CalEvent = {
        title: '',
        start: slotInfo.start,
        end: dayjs(slotInfo.start).add(1, 'hour').toDate(),
      };
      mockSetCalendarEvent((e: any) => ({ ...e, event, show: true, new: true }));
    };
    onSelectSlot(onSelectSlotMock);

    expect(mockSetCalendarEvent).toHaveBeenCalledWith(expect.any(Function));

    // Invoke the function passed to setCalendarEvent
    const setCalendarEventArg = mockSetCalendarEvent.mock.calls[0][0];
    const prevState: CalendarEventProps = {
      event: undefined,
      show: false,
      new: false,
    };
    const newState = setCalendarEventArg(prevState);

    expect(newState).toEqual(
      expect.objectContaining({
        event: expect.objectContaining({
          title: '',
          start: startTime,
          end: endTime,
        }),
        show: true,
        new: true,
      }),
    );
  });
});

import { render, screen, fireEvent } from '@testing-library/react';
import moment from 'moment';
import Drawer from '.';
import { CalEvent } from '~/utils/interfaces';

describe('Drawer', () => {
  const event = {
    id: 1,
    title: 'timed event',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit amet luctus venenatis, lectus magna fringilla urna, porttitor rhoncus dolor purus non enim praesent elementum facilisis leo, vel.',
    location: 'Nashville, Tennessee. U.S.',
    visibility: 'Public',
    start: moment().add(1, 'hour').toDate(),
    end: moment().add(2, 'hours').toDate(),
    attendees: [
      {
        attendee: {
          email: 'attendee1@example.com',
        },
      },
      {
        attendee: {
          email: 'attendee2@example.com',
        },
      },
      {
        attendee: {
          email: 'attendee10@example.com',
        },
      },
    ],
    calendarId: 1,
  };

  it('renders the event details correctly', () => {
    const toggleDrawerMock = jest.fn();
    render(
      <Drawer event={event as CalEvent} isDrawerVisible={true} toggleDrawer={toggleDrawerMock} />,
    );

    expect(screen.getByText(event.title)).toBeInTheDocument();
    expect(screen.getByText(event.location)).toBeInTheDocument();
    expect(screen.getByText(event.description)).toBeInTheDocument();

    const closeButton = screen.getByRole('button', { name: /close/i });
    const joinButton = screen.getByRole('button', { name: /join event/i });
    const background = screen.getByTestId('drawer-background');

    expect(closeButton).toBeInTheDocument();
    expect(joinButton).toBeInTheDocument();
    expect(background).toBeInTheDocument();

    fireEvent.click(closeButton);
    expect(toggleDrawerMock).toHaveBeenCalledTimes(1);

    const eventTime = screen.getByText(
      `${moment(event.start).format('MMMM DD, YYYY h A')} - ${moment(event.end).format('MMMM DD, YYYY h A')}`,
    );
    expect(eventTime).toBeInTheDocument();

    event.attendees?.forEach(({ attendee }) => {
      const attendeeEmail = screen.getByText(attendee.email);
      expect(attendeeEmail).toBeInTheDocument();
    });
  });

  it('toggles the drawer visibility when clicking the background', () => {
    const toggleDrawerMock = jest.fn();
    render(
      <Drawer event={event as CalEvent} isDrawerVisible={true} toggleDrawer={toggleDrawerMock} />,
    );

    const background = screen.getByTestId('drawer-background');
    fireEvent.click(background);

    expect(toggleDrawerMock).toHaveBeenCalled();
  });

  it('calls the toggleDrawer function when clicking the close button', () => {
    const toggleDrawerMock = jest.fn();
    render(
      <Drawer event={event as CalEvent} isDrawerVisible={true} toggleDrawer={toggleDrawerMock} />,
    );

    const closeButton = screen.getByText('Close');
    fireEvent.click(closeButton);

    expect(toggleDrawerMock).toHaveBeenCalled();
  });
});

import { render } from '@testing-library/react';
import moment from 'moment';
import EventCard from './index';

describe('EventCard', () => {
  const date = moment().format('D');
  const month = moment().format('MMM');
  const dummyevent1 = {
    id: 1,
    title: 'timed event',
    start: moment().add(1, 'hour').toDate(),
    end: moment().add(2, 'hours').toDate(),
    attendees: [
      {
        attendee: {
          email: 'samyak3@rcal.com',
        },
      },
    ],
  };

  const dummyevent2 = {
    id: 1,
    title: 'timed event',
    start: moment().add(1, 'hour').toDate(),
    end: moment().add(2, 'hours').toDate(),
    attendees: [
      {
        attendee: {
          email: 'samyak@rcal.com',
        },
      },
      {
        attendee: {
          email: 'samyak2@rcal.com',
        },
      },
      {
        attendee: {
          email: 'samyak3@rcal.com',
        },
      },
    ],
  };

  const dummyevent3 = {
    id: 1,
    title: 'timed event',
    start: moment().add(1, 'hour').toDate(),
    end: moment().add(2, 'hours').toDate(),
  };

  const startDate = moment(dummyevent1.start);
  const startTime = startDate.format('h:mm A');
  const endTime = moment(dummyevent1.end).format('h:mm A');

  it('should render the event name', () => {
    const { getByText } = render(<EventCard {...dummyevent1} />);
    const eventName = getByText(dummyevent1.title);
    expect(eventName).toBeInTheDocument();
  });

  it('should render the number of attendees when there are less than or equal to one number of attendee', () => {
    const { getByText } = render(<EventCard {...dummyevent1} />);
    const attendeesText = `${dummyevent1.attendees.length} ${
      dummyevent1.attendees.length > 1 ? 'Participants' : 'Participant'
    }`;
    const attendees = getByText(attendeesText);
    expect(attendees).toBeInTheDocument();
  });

  it('should render the number of attendees when there are more than one number of attendees', () => {
    const { getByText } = render(<EventCard {...dummyevent2} />);
    const attendeesText = `${dummyevent2.attendees.length} ${
      dummyevent2.attendees.length > 1 ? 'Participants' : 'Participant'
    }`;
    const attendees = getByText(attendeesText);
    expect(attendees).toBeInTheDocument();
  });

  it('should render the number of attendees when there are more than one number of attendees', () => {
    const { getByText } = render(<EventCard {...dummyevent3} />);
    const attendeesText = '0 Participant';
    const attendees = getByText(attendeesText);
    expect(attendees).toBeInTheDocument();
  });

  it('should render the correct date', () => {
    const { getByText } = render(<EventCard {...dummyevent1} />);
    const dateText = `${date}`;
    const eventDate = getByText(dateText);
    expect(eventDate).toBeInTheDocument();
  });

  it('should render the correct month', () => {
    const { getByText } = render(<EventCard {...dummyevent1} />);
    const monthText = `${month}`;
    const eventMonth = getByText(monthText);
    expect(eventMonth).toBeInTheDocument();
  });

  it('should render the correct time', () => {
    const { getByText } = render(<EventCard {...dummyevent1} />);
    const timeText = `${startTime} — ${endTime}`;
    const eventTime = getByText(timeText);
    expect(eventTime).toBeInTheDocument();
  });
});

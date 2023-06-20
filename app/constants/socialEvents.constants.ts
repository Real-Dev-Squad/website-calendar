import dayjs from "dayjs";

export const socialMockEvents = [{
    id: 1,
    title: 'stand up feature demo',
    start: dayjs('2023-06-01').add(1, 'hour').toDate(),
    end: dayjs('2023-06-01').add(2, 'hours').toDate(),
    visibility: 'public',
    attendees: [
      {
        attendee: {
          email: 'ankush@rcal.com',
        },
      },
      {
        attendee: {
          email: 'prakash@rcal.com',
        },
      },
      {
        attendee: {
          email: 'ritik@rcal.com',
        },
      },
      {
        attendee: {
          email: 'shreya@rcal.com',
        },
      },
    ],
  },
  {
    id: 1,
    title: 'Discord Bot Feature',
    description: 'Integration of verifying of users, providing users RDS specific roles',
    start: dayjs().add(1, 'hour').toDate(),
    end: dayjs().add(2, 'hours').toDate(),
    visibility: 'public',
    attendees: [
      {
        attendee: {
          email: 'ankush@rcal.com',
        },
      },
      {
        attendee: {
          email: 'prakash@rcal.com',
        },
      },
      {
        attendee: {
          email: 'shreya@rcal.com',
        },
      },
    ],
  }];
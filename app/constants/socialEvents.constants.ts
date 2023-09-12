import dayjs from "dayjs";

export const socialMockEvents = [
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
  },
  {
    id: 2,
    title: 'Calendar Site Demo',
    description: `
    The agenda of the call includes Introduction of the core members of team ,Problem statement, Technical requirements of the product, Project discussion, Working Demo 

    `,
    start: dayjs('2023-07-26').add(6, 'hour').add(30,'minutes').toDate(),
    end: dayjs('2023-07-26').add(7, 'hours').toDate(),
    visibility: 'public',
    attendees: [
      {
        attendee: {
          email: 'ankush@rcal.com',
        },
      },
      {
        attendee: {
          email: 'vivek@rcal.com',
        },
      },
      {
        attendee: {
          email: 'rohit@rcal.com',
        },
      },
      {
        attendee: {
          email: 'prakash@rcal.com',
        },
      },
      {
        attendee: {
          email: 'harshith@rcal.com',
        },
      },
    ],
  }];
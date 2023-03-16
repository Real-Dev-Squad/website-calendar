import EventCard from '~/components/common/eventCard';
export default function socialEvents() {
  const dummyEvent = {
    id: 11,
    name: 'NEW',
    description: 'SOME',
    location: 'sad',
    startTime: '2023-03-02T14:59:16.114Z',
    endTime: '2023-03-02T14:59:28.578Z',
    ownerId: 1,
    eventTypeId: 1,
    calendarId: 1,
    isDeleted: false,
    Attendees: [
      {
        attendee: {
          email: 'ankur@rcal.com',
        },
      },
    ],
    EventType: {
      name: 'event',
    },
  };
  return <EventCard event={dummyEvent} />;
}

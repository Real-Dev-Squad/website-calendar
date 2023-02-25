import EventCard from '~/components/common/eventCard';

export default function socialEvents() {
  return (
    <>
      <EventCard
        date={30}
        month="AUG"
        time="12AM to 1:30PM"
        eventTitle="React India Conf"
        participantCount="100 Participants"
      />
    </>
  );
}

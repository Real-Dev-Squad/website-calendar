import EventCard from '~/components/common/eventCard';

export default function socialEvents() {
  return (
    <>
      <EventCard
        date={30}
        month="AUG"
        fromTime="12AM"
        toTime="1:30PM"
        eventTitle="React India Conf"
        participantCount={100}
      />
    </>
  );
}

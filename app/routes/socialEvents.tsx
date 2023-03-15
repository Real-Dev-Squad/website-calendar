import EventCard from '~/components/common/eventCard';
import { eventDetails } from '../components/common/eventCard/utils/eventDetailsObject';
export default function socialEvents() {
  return (
    <>
      <EventCard eventTitle="React India Conf" participantCount={100} eventDetails={eventDetails} />
    </>
  );
}

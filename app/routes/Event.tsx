import Calendar from '~/components/Calendar.client';

//TODO - create ticket to show spinner as a fallback component(Ticket will be attached)
const Fallback = () => <p>Loading...</p>;

const Event = () => (typeof document !== 'undefined' ? <Calendar /> : <Fallback />);

export default Event;

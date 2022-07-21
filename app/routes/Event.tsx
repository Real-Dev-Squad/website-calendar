import Calendar from '~/components/Calendar.client';

// This will changed - TODO
const Fallback = () => {
  return <p>Loading IDE...</p>;
};

function Event() {
  return typeof document !== 'undefined' ? <Calendar /> : <Fallback />;
}

export default Event;

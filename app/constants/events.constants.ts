const now = new Date();

export const dummyEvent = {
  title: '',
  start: now,
  end: new Date(now.getTime() + 60000 * 30),
  location: '',
  description: '',
  attendees: [],
};

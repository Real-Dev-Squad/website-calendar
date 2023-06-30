import dayjs from "dayjs";
import { CalEvent } from "~/utils/interfaces";

export const userEvents: CalEvent[] = [
    
    {
      id: 1,
      title: 'timed event',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit amet luctus venenatis, lectus magna fringilla urna, porttitor rhoncus dolor purus non enim praesent elementum facilisis leo, vel.',
      location: 'Nashville, Tennessee. U.S.',
      start: dayjs().add(1, 'hour').toDate(),
      end: dayjs().add(2, 'hours').toDate(),
      visibility: 'private',
      attendees: [{ attendee: { email: 'a@b.c' } }, { attendee: { email: 'alpha@beta.gamma' } }],
      onlineEventLink: 'https://github.com/Real-Dev-Squad/website-calendar'
    },
  ];
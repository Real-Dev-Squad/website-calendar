import { Link } from '@remix-run/react';
import dayjs from 'dayjs';

import { DynamicHeroIcon } from '~/components/common/navbar';
import { CalEvent } from '~/utils/interfaces';

const EventCard = ({
  title,
  start,
  end,
  attendees,
  location,
  meetLink
} : CalEvent) => {
    const startDate = dayjs(start);
  const startTime = startDate.format('YYYY MMM DD h:mm A');
  const endTime = dayjs(end).format('YYYY MMM DD h:mm A');
    return(
  <>
    <div
      data-testid="event-card-box"
      className="w-full rounded-xl px-4 py-3 border-2 border-grey grid grid-cols-[auto,1fr] items-center gap-6"
      
    >
      <div data-testid="event-card-dates" className="w-18 grid grid-cols-1 gap-1">
        <div className="text-xs text-grey-med">{startTime}</div>
        <div className="w-full flex justify-center">
          <div className="border-l-2 border-grey h-2"></div>
        </div>
        <div className="text-xs text-grey-med">{endTime}</div>
      </div>
      <div data-testid="event-card-content" className="w-full grid grid-cols-1 gap-1.5">
        <div
          data-testid="event-card-title"
          className="text-lg font-semibold text-grey-dark leading-5 truncate overflow-ellipsis"
        >
          {title}
        </div>
        <div className="w-full">
          {attendees && (
            <div data-testid="event-card-participants" className="w-full text-sm text-grey-dark">
              {attendees.reduce((list,attendeeData) => list + attendeeData.attendee.email + ' ','')}
            </div>
          )}
          {!attendees && location && (
            <div
              data-testid="event-card-location"
              className="w-full grid grid-cols-[auto,1fr] items-center gap-1"
            >
              <div className="w-4 h-4 flex items-center pt-0.5">
                <DynamicHeroIcon name={'MapPin'} className={'text-grey-dark text-lg'} />
              </div>
              <div className="w-full text-sm text-grey-dark">{location}</div>
            </div>
          )}
          {!attendees && !location && meetLink && (
            <Link
              target={'blank'}
              to={meetLink}
              data-testid="event-card-meet"
              className="w-full grid grid-cols-[auto,1fr] items-center gap-1"
            >
              <div className="w-3 h-4 flex items-center mr-1 pt-0.5">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 87.5 72">
                  <path
                    fill="#00832d"
                    d="M49.5 36l8.53 9.75 11.47 7.33 2-17.02-2-16.64-11.69 6.44z"
                  />
                  <path
                    fill="#0066da"
                    d="M0 51.5V66c0 3.315 2.685 6 6 6h14.5l3-10.96-3-9.54-9.95-3z"
                  />
                  <path fill="#e94235" d="M20.5 0L0 20.5l10.55 3 9.95-3 2.95-9.41z" />
                  <path fill="#2684fc" d="M20.5 20.5H0v31h20.5z" />
                  <path
                    fill="#00ac47"
                    d="M82.6 8.68L69.5 19.42v33.66l13.16 10.79c1.97 1.54 4.85.135 4.85-2.37V11c0-2.535-2.945-3.925-4.91-2.32zM49.5 36v15.5h-29V72h43c3.315 0 6-2.685 6-6V53.08z"
                  />
                  <path fill="#ffba00" d="M63.5 0h-43v20.5h29V36l20-16.57V6c0-3.315-2.685-6-6-6z" />
                </svg>
              </div>
              <div className="w-full text-sm text-grey-dark">Google Meet</div>
            </Link>
          )}
          {!attendees && !location && !meetLink && (
            <div data-testid="event-card-no-details" className="w-full text-sm text-grey-dark">
              No details provided
            </div>
          )}
        </div>
      </div>
    </div>
  </>
)};

export default EventCard;
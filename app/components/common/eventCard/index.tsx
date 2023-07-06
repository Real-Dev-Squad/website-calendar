import { Link } from '@remix-run/react';
import dayjs from 'dayjs';
import { DynamicHeroIcon } from '../navbar';
import { CalEvent } from '~/utils/interfaces';
import { GoogleMeet } from '../../../components/icons';

const EventCard = ({
  title, start, end, attendees, location, onlineEventLink,
}: CalEvent) => {
  const startDate = dayjs(start);
  const startTime = startDate.format('YYYY MMM DD h:mm A');
  const endTime = dayjs(end).format('YYYY MMM DD h:mm A');
  return (
    <>
      <div
        data-testid="event-card-box"
        className="w-full rounded-xl px-4 py-3 border-2 border-grey grid grid-cols-[auto,1fr] items-center gap-6 cursor-pointer"
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
              <div data-testid="event-card-attendees" className="w-full text-sm text-grey-dark">
                {attendees.map((data) => data.attendee.email).join(', ')}
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
            {!attendees && !location && onlineEventLink && (
              <Link
                target={'blank'}
                to={onlineEventLink}
                data-testid="event-card-meet"
                className="w-full grid grid-cols-[auto,1fr] items-center gap-1"
              >
                <div className="w-3 h-4 flex items-center mr-1 pt-0.5">
                  <GoogleMeet />
                </div>
              </Link>
            )}
            {!attendees && !location && !onlineEventLink && (
              <div data-testid="event-card-no-details" className="w-full text-sm text-grey-dark">
                No details provided
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default EventCard;

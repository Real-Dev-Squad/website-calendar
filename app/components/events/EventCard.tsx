import { Link } from '@remix-run/react';
import React from 'react';

import { DynamicHeroIcon } from '~/components/common/navbar';

const EventCard = ({
  title,
  dateFrom,
  dateTo,
  participants,
  location,
  meetLink,
}: {
  title: string;
  dateFrom: string;
  dateTo: string;
  participants?: string[];
  location?: string;
  meetLink?: string;
}) => (
  <>
    <div className="w-full rounded-xl px-4 py-3 border-2 border-grey grid grid-cols-[auto,1fr] items-center gap-6">
      <div className="w-18 grid grid-cols-1 gap-1">
        <div className="text-xs text-grey-med">{dateFrom}</div>
        <div className="w-full flex justify-center">
          <div className="border-l-2 border-grey h-2"></div>
        </div>
        <div className="text-xs text-grey-med">{dateTo}</div>
      </div>
      <div className="w-full grid grid-cols-1 gap-1.5">
        <div className="text-lg font-semibold text-grey-dark leading-5 truncate overflow-ellipsis">
          {title}
        </div>
        <div className="w-full">
          {participants && (
            <div className="w-full text-sm text-grey-dark">{participants.join(', ')}</div>
          )}
          {!participants && location && (
            <div className="w-full grid grid-cols-[auto,1fr] items-center gap-1">
              <div className="w-4 h-4 flex items-center pt-0.5">
                <DynamicHeroIcon name={'MapPin'} className={'text-grey-dark text-lg'} />
              </div>
              <div className="w-full text-sm text-grey-dark">{location}</div>
            </div>
          )}
          {!participants && !location && meetLink && (
            <Link
              target={'blank'}
              to={meetLink}
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
          {!participants && !location && !meetLink && (
            <div className="w-full text-sm text-grey-dark">No details provided</div>
          )}
        </div>
      </div>
    </div>
  </>
);

export default EventCard;

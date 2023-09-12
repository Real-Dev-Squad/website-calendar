import { GlobeAltIcon, LockClosedIcon } from '@heroicons/react/24/outline';
import { FC } from 'react';

export interface EventVisibilityProps {
  visibility: string;
}

const EventVisibility: FC<EventVisibilityProps> = ({ visibility }) => (
  <div className="bg-neutral-200 flex items-center gap-1 px-3 py-1 rounded-full w-fit font-normal text-[14px] text-neutral-500">
    {visibility === 'public' && (
      <>
        <GlobeAltIcon data-testid="globe-icon" className="w-4 self-center" /> Public
      </>
    )}
    {visibility === 'private' && (
      <>
        <LockClosedIcon data-testid="lock-icon" className="w-4 self-center" /> Private
      </>
    )}
  </div>
);

export default EventVisibility;

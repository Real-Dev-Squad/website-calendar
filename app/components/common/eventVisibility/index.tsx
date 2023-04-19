import { GlobeAltIcon, LockClosedIcon } from '@heroicons/react/24/outline';
import { FC } from 'react';

export interface EventVisibilityProps {
  visibility: string;
  setVisibility: (visibility: string) => void;
}

const EventVisibility: FC<EventVisibilityProps> = ({ visibility, setVisibility }) => (
  <button
    data-testid="modal-visibility"
    className="bg-neutral-200 flex align-middle gap-1 px-3 py-1 mb-8 rounded-full w-fit font-normal text-[14px] text-neutral-500 cursor-pointer"
    onClick={() => setVisibility(visibility === 'public' ? 'private' : 'public')}
  >
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
  </button>
);

export default EventVisibility;

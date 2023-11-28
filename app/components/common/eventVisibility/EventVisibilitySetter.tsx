import { FC, useState } from 'react';
import { GlobeAltIcon, LockClosedIcon } from '@heroicons/react/24/outline';

export interface EventVisibilityProps {
  isPrivate: boolean;
  setVisibility: (isPrivate: boolean) => void;
}

const EventVisibilitySetter: FC<EventVisibilityProps> = ({ isPrivate, setVisibility }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  const toggleSwitch = () => {
    setVisibility(!isPrivate);
  };

  return (
    <div className="flex items-center cursor-pointer" onClick={toggleSwitch}>
      <div
        className="relative inline-block mr-2 text-gray-700 animate-pulse cursor-pointer"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        data-testid="icon-container"
      >
        {isPrivate ? (
          <LockClosedIcon data-testid="lock-icon" className="w-6 self-center" />
        ) : (
          <GlobeAltIcon data-testid="globe-icon" className="w-6 self-center" />
        )}
        {showTooltip && (
          <div
            className="absolute right-10 transform translate-x-2 top-1/2 -translate-y-1/2 z-10 p-2 rounded-lg bg-black text-white text-xs"
            data-testid="tooltip"
          >
            {isPrivate ? 'Private' : 'Public'}
          </div>
        )}
      </div>
      <div className="relative inline-block w-10 h-5" data-testid="checkbox-container">
        <input type="checkbox" className="hidden" checked={!isPrivate} onChange={toggleSwitch} />
        <span
          data-testid="bg-toggle-span"
          className={`block absolute inset-0 rounded-full transition-all duration-300 ease-in-out ${
            isPrivate ? 'bg-gray-400' : 'bg-green-400'
          }`}
        ></span>
        <span
          className={`absolute left-0 top-0 bottom-0 w-5 h-5 border bg-white rounded-full shadow transition-transform duration-300 ease-in-out transform ${
            isPrivate ? 'translate-x-0' : 'translate-x-full'
          }`}
        ></span>
      </div>
    </div>
  );
};

export default EventVisibilitySetter;

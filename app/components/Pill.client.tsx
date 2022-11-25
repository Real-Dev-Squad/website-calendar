import React, { ComponentType, MouseEventHandler } from 'react';
import { HashtagIcon, HeartIcon } from '@heroicons/react/24/solid';
import { IconProps } from '~/types/Icon';

interface PillProps {
  title: string;
  Icon?: ComponentType<IconProps>;
  IconOnHover?: ComponentType<IconProps>;
  action?: MouseEventHandler;
  pillBackground?: string;
  iconColor?: string;
  iconHoverColor?: string;
}

const Pill: React.FC<PillProps> = ({
  title,
  Icon = HashtagIcon,
  IconOnHover = HeartIcon,
  action,
  pillBackground = 'bg-slate-200',
  iconColor = 'text-blue-500',
  iconHoverColor = 'text-red-500',
}: PillProps) => (
  <button
    className={`relative rounded-full group py-2 pr-4 pl-3 ${pillBackground}`}
    onClick={action}
  >
    <span className="absolute pr-2 opacity-100 group-hover:opacity-0 ease-in-out duration-300">
      <Icon data-testid="icon" className={`h-6 w-6 ${iconColor}`} />
    </span>
    <span className="absolute pr-2 opacity-0 group-hover:opacity-100 ease-in-out duration-300">
      <IconOnHover data-testid="icon-on-hover" className={`h-6 w-6 ${iconHoverColor}`} />
    </span>
    <span className="pl-6">{title}</span>
  </button>
);

export default Pill;

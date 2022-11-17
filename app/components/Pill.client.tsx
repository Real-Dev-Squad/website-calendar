import React, { ComponentType, MouseEventHandler } from 'react';
import { HashtagIcon, HeartIcon } from '@heroicons/react/24/solid';
import { IconProps } from '~/types/Icon';

interface PillProps {
  title: string;
  IconA?: ComponentType<IconProps>;
  IconB?: ComponentType<IconProps>;
  action?: MouseEventHandler;
}

const Pill: React.FC<PillProps> = ({
  title,
  IconA = HeartIcon,
  IconB = HashtagIcon,
  action,
}: PillProps) => (
  <button className="relative rounded-full bg-slate-200 group py-2 pr-4 pl-3" onClick={action}>
    <span className="absolute pr-2 opacity-0 group-hover:opacity-100 ease-in-out duration-300">
      <IconA className="h-6 w-6 text-red-500" />
    </span>
    <span className="absolute pr-2 opacity-100 group-hover:opacity-0 ease-in-out duration-300">
      <IconB className="h-6 w-6 text-blue-500" />
    </span>
    <span className="pl-6">{title}</span>
  </button>
);

export default Pill;

import React, { ReactNode } from 'react';
import { Button } from '~/components/Button';

interface ContentPillProps {
  title: string;
  btnHeading: string;
  svg: ReactNode;
}

const ContentPill: React.FC<ContentPillProps> = ({ title, btnHeading, svg }) => (
  <div className="flex justify-between m-4">
    <div className="flex basis-5/6">
      {svg}
      <p className="pl-4">{title}</p>
    </div>
    <div className="basis-1/6">
      <Button size="small" varient="secondary" label={btnHeading} />
    </div>
  </div>
);

export default ContentPill;

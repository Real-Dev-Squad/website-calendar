import * as React from 'react';
import { LinkButton } from './Button';
import { Google, Microsoft } from './icons';

interface SocialAuthProps {
  google: string;
  microsoft: string;
}

export const SocialAuth: React.FC<SocialAuthProps> = ({ google, microsoft }) => (
  <div className="flex flex-col w-full gap-4 my-8">
    <LinkButton icon={Google} title="Continue with Google" href={google} />

    <LinkButton icon={Microsoft} title="Continue with Microsoft" href={microsoft} />
  </div>
);

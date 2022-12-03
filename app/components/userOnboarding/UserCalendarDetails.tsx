import { GoogleCalendar } from '../icons';
import { Button } from '../Button';
import ContentPill from '../common/contentPill';

const UserCalendarDetails = () => (
  <div className="h-full flex flex-col justify-between">
    <div className="relative">
      <ContentPill title="Apple Calendar" btnHeading="Connect" svg={<GoogleCalendar />} />
      <ContentPill title="Microsoft Calendar" btnHeading="Connect" svg={<GoogleCalendar />} />
      <ContentPill title="Google Calendar" btnHeading="Connect" svg={<GoogleCalendar />} />
    </div>
    <div className="flex justify-center">
      <button className="text-sm pb-3">I&apos;ll connect my calendar later</button>
    </div>
  </div>
);

export default UserCalendarDetails;

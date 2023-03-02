import { GoogleCalendar, MicrosoftCalendar } from '../../components/icons';
import ContentPill from '../../components/common/contentPill';

const UserCalendarDetails = () => (
  <div className="h-full flex flex-col justify-between">
    <div className="relative">
      <ContentPill title="Microsoft Calendar" btnHeading="Connect" svg={<MicrosoftCalendar />} />
      <ContentPill title="Google Calendar" btnHeading="Connect" svg={<GoogleCalendar />} />
    </div>
    <div className="flex justify-center">
      <button className="text-sm pb-3">I&apos;ll connect my calendar later</button>
    </div>
  </div>
);

export default UserCalendarDetails;

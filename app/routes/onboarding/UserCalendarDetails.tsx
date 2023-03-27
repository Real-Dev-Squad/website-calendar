import { GoogleCalendar, MicrosoftCalendar } from '../../components/icons';
import ContentPill from '../../components/common/contentPill';
import { Button } from '~/components/Button';

const UserCalendarDetails = () => (
  <div className="h-full flex flex-col justify-between">
    <div className="relative">
      <ContentPill title="Microsoft Calendar" btnHeading="Connect" svg={<MicrosoftCalendar />} />
      <ContentPill title="Google Calendar" btnHeading="Connect" svg={<GoogleCalendar />} />
    </div>
    <div className="flex flex-col ">
      <button className="text-sm pb-3">I&apos;ll connect my calendar later</button>
      <div className=" mx-4 mb-3 ">
        <Button
          label="Save & Next"
          size="medium"
          varient="primary"
          type={'submit'}
          style={'my-2'}
        />
      </div>
    </div>
  </div>
);

export default UserCalendarDetails;

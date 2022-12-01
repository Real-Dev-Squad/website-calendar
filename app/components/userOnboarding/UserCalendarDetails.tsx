import { GoogleCalendar, MicrosoftCalendar } from '../icons';
import { Button } from '../Button';

const UserCalendarDetails = () => (
  <div className="relative">
    <div className="flex justify-between m-4">
      <div className="flex basis-5/6">
        <GoogleCalendar className="mx-0" />
        <p className="pl-4">Apple Calendar</p>
      </div>
      <div className="basis-1/6">
        <Button size="small" varient="secondary" label="Connect" width="w-auto" />
      </div>
    </div>

    <div className="flex justify-between m-4">
      <div className="flex basis-5/6">
        <GoogleCalendar className="mx-0" />
        <p className="pl-4">Google Calendar</p>
      </div>
      <div className="basis-1/6">
        <Button size="small" varient="secondary" label="Connect" width="w-auto" />
      </div>
    </div>

    <div className="flex justify-between m-4">
      <div className="flex basis-5/6">
        <GoogleCalendar className="mx-0" />
        <p className="pl-4">Microsoft Calendar</p>
      </div>
      <div className="basis-1/6">
        <Button size="small" varient="secondary" label="Connect" width="w-auto" />
      </div>
    </div>

    <div className=" absolute -bottom-52 left-1/2  -translate-x-1/2 -translate-y-1/2">
      <div className="flex justify-center">
        <button className="text-sm ">I&apos;ll connect my calendar later</button>
      </div>
    </div>
  </div>
);

export default UserCalendarDetails;
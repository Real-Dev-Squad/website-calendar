import { CalEvent } from '~/utils/interfaces';
import moment from 'moment';

export default function EventCard({ title, attendees, start, end }: CalEvent) {
  const startDate = moment(start);
  const date = startDate.format('D');
  const month = startDate.format('MMM');
  const startTime = startDate.format('h:mm A');
  const endTime = moment(end).format('h:mm A');
  const numberOfAttendees = attendees ? attendees.length : 0;
  return (
    <>
      <div className="border-2 w-64 h-72 bg-gray-200 rounded-3xl m-auto p-4 flex flex-col justify-between">
        <div className="flex justify-end align-end">
          <div className="w-10 h-12 top-4 bg-white rounded-lg flex items-center flex-col divide-y">
            <div className="text-black font-medium text-base">{date}</div>
            <div className="text-black font-medium text-sm">{month}</div>
          </div>
        </div>
        <div className="gap-2 flex flex-col justify-end p-2">
          <div className="text-xs text-gray-700 font-medium">
            {startTime} — {endTime}
          </div>
          <div className="text-black font-medium text-lg event-title"> {title} </div>
          <div className="flex gap-2">
            <div className="flex">
              <div className="w-5 h-5 rounded-full border border-black inline-block bg-gray-300 ml-0"></div>
              <div className="w-5 h-5 rounded-full border border-black inline-block ml-[-8px] bg-gray-300 two"></div>
              <div className="w-5 h-5 rounded-full border border-black inline-block ml-[-8px] bg-gray-300 three"></div>
            </div>
            <div className="font-medium text-sm">
              {numberOfAttendees} {numberOfAttendees <= 1 ? 'Participant' : 'Participants'}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

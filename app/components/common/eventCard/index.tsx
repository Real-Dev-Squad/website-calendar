import { Event } from '~/utils/interfaces';
import moment from 'moment';

const date = moment().format('D');
const month = moment().format('MMM');
const time = moment().format('h:mm A');

export default function EventCard({ name, attendees }: Event) {
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
          <div className="text-xs text-gray-700 font-medium"> {time} </div>
          <div className="text-black font-medium text-lg event-title"> {name} </div>
          <div className="flex gap-2">
            <div className="flex">
              <div className="w-5 h-5 rounded-full border border-black inline-block bg-gray-300 ml-0"></div>
              <div className="w-5 h-5 rounded-full border border-black inline-block ml-[-8px] bg-gray-300 two"></div>
              <div className="w-5 h-5 rounded-full border border-black inline-block ml-[-8px] bg-gray-300 three"></div>
            </div>
            <div className="font-medium text-sm">
              {attendees.length} {attendees.length > 1 ? 'Participants' : 'Participant'}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

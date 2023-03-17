import { Event } from '~/utils/interfaces';

export default function EventCard({ name, Attendees }: Event) {
  return (
    <>
      <div className="border-2 w-64 h-72 bg-gray-200 rounded-3xl m-auto relative">
        <div className="w-10 h-12 left-52 top-4 bg-white rounded-lg flex items-center flex-col relative divide-y">
          {/* Hard coding Date and month for time being, but will have to update once we have days.js in our codebase */}
          <div className="text-black font-medium text-base">30</div>
          <div className="text-black font-medium text-sm">AUG</div>
        </div>

        <div className="ml-6 bottom-4 gap-2 absolute flex flex-col">
          {/* Hard coding Time for time being, but will have to update once we have days.js in our codebase */}
          <div className="text-xs text-gray-700 font-medium">12AM to 1:30AM</div>
          <div className="text-black font-medium text-lg event-title"> {name} </div>
          <div className="flex gap-2">
            <div className="flex">
              <div className="w-5 h-5 rounded-full border border-black inline-block bg-gray-300 ml-0"></div>
              <div className="w-5 h-5 rounded-full border border-black inline-block ml-[-8px] bg-gray-300 two"></div>
              <div className="w-5 h-5 rounded-full border border-black inline-block ml-[-8px] bg-gray-300 three"></div>
            </div>
            <div className="font-medium text-sm"> {Attendees.length} Participants</div>
          </div>
        </div>
      </div>
    </>
  );
}

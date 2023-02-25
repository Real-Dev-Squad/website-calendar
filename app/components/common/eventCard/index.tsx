interface EventCardProps {
  date: number;
  month: string;
  time: any;
  eventTitle: string;
  participantCount: any;
}

export default function EventCard({
  date,
  month,
  time,
  eventTitle,
  participantCount,
}: EventCardProps) {
  return (
    <>
      <div className="border-2 w-64 h-72 bg-gray-200 rounded-3xl m-auto relative">
        <div className="w-10 h-12 left-52 top-4 bg-white rounded-lg flex items-center flex-col relative divide-y">
          <div className="text-black font-medium text-base">{date}</div>
          <div className="text-black font-medium text-sm"> {month} </div>
        </div>

        <div className="ml-6 bottom-4 gap-2 absolute flex flex-col">
          <div className="text-xs text-gray-700 font-medium"> {time} </div>
          <div className="text-black font-medium text-lg event-title"> {eventTitle} </div>
          <div className="flex gap-2">
            <div className="flex">
              <div className="w-5 h-5 rounded-full border border-black inline-block bg-gray-300 ml-0"></div>
              <div className="w-5 h-5 rounded-full border border-black inline-block ml-[-8px] bg-gray-300 two"></div>
              <div className="w-5 h-5 rounded-full border border-black inline-block ml-[-8px] bg-gray-300 three"></div>
            </div>
            <div className="font-medium text-sm"> {participantCount} </div>
          </div>
        </div>
      </div>
    </>
  );
}

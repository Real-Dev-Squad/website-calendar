import React from 'react';

const CalendarEventCard = ({
  title,
  dateFrom,
  dateTo,
}: {
  title: string;
  dateFrom: string;
  dateTo: string;
}) => (
  <>
    <div className="w-full h-full rounded-xl px-3 py-2 bg-grey-light flex items-start gap-2">
      <div className="w-full  grid grid-cols-1 items-start gap-2">
        <div className="text-md font-semibold text-grey-dark leading-5 truncate overflow-ellipsis">
          {title}
        </div>
        <div className="w-full gap-1 flex items-center">
          <div className="text-xs text-grey-med">{dateFrom}</div>
          <div className="border-b-1 border-grey-med w-3"></div>
          <div className="text-xs text-grey-med">{dateTo}</div>
        </div>
      </div>
    </div>
  </>
);

export default CalendarEventCard;

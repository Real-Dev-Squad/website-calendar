import ToastUICalendar from '@toast-ui/react-calendar';
import { useState } from 'react';

const Calendar = () => {
  const calendarViews = ["month","week","day"]
  const [calendarView, setCalendarView] = useState(calendarViews[0]);
  return (
  <>
    <h4 className="border border-blue m-auto text-center text-3xl text-blue-700">RDS Calendar</h4>
    <div>
    {calendarViews.map((calendarViewData: string,index:number) => (
      <button key={index} onClick={() => setCalendarView(calendarViewData)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-5">{calendarViewData}</button>
    ))}
    </div>
    <ToastUICalendar view={calendarView as any} height="100vh" />
  </>
)};

export default Calendar;

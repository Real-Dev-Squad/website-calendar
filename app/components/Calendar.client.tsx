import { useCallback, useRef } from "react";
import TUICalendar from "@toast-ui/react-calendar";
import { ISchedule, ICalendarInfo, IEventScheduleObject, DateType } from "tui-calendar";
import "tui-calendar/dist/tui-calendar.css";
import "tui-date-picker/dist/tui-date-picker.css";
import "tui-time-picker/dist/tui-time-picker.css";

const start = new Date();
const end = new Date(new Date().setMinutes(start.getMinutes() + 30));
const schedules: ISchedule[] = [
  {
    id: '1',
    calendarId: '1',
    title: 'timed event',
    body: 'TOAST UI Calendar',
    start: new Date(new Date().setHours(start.getHours() + 1)),
    end: new Date(new Date().setHours(start.getHours() + 4)),
    location: 'Meeting Room A',
    attendees: ['A', 'B', 'C'],
    category: 'time',
    state: 'Free',
    isReadOnly: true,
    color: '#fff',
    bgColor: '#ccc'
  },
  {
    calendarId: "1",
    category: "time",
    isVisible: true,
    title: "Study",
    id: "1",
    body: "Test",
    start,
    end
  },
  {
    calendarId: "1",
    category: "time",
    isVisible: true,
    title: "Meeting",
    id: "1",
    body: "Description",
    start: new Date(new Date().setHours(start.getHours() + 1)),
    end: new Date(new Date().setHours(start.getHours() + 2))
  }
];

const calendars: ICalendarInfo[] = [
  {
    id: "1",
    name: "My Calendar",
    color: "#ffffff",
    bgColor: "#9e5fff",
    dragBgColor: "#9e5fff",
    borderColor: "#9e5fff"
  }
];

const Calendar = () => {
  const cal = useRef<TUICalendar | null>(null)

  const onClickSchedule = useCallback((e: {schedule: ISchedule}) => {
    const { calendarId, id } = e.schedule;
    const el = cal.current!.calendarInstance?.getElement(id!, calendarId!);

  }, []);

  const onBeforeCreateSchedule = useCallback((scheduleData: ISchedule) => {
    
    const schedule = {
      id: String(Math.random()),
      title: scheduleData.title,
      isAllDay: scheduleData.isAllDay,
      start: scheduleData.start?.toString(),
      end: scheduleData.end?.toString(),
      dueDateClass: "",
      location: scheduleData.location,
    };

    cal.current!.calendarInstance!.createEvents([schedule]);
  }, []);

  const onBeforeDeleteSchedule = useCallback((res: IEventScheduleObject) => {

    const { id, calendarId } = res.schedule;

    cal.current!.calendarInstance!.deleteEvent(id!, calendarId!);
  }, []);

  const onBeforeUpdateSchedule = useCallback((e : { schedule: ISchedule, changes: any}) => {
    

    const { schedule, changes } = e;

    cal.current!.calendarInstance!.updateEvent(
      schedule.id!,
      schedule.calendarId!,
      changes
    );
  }, []);

  function _getFormattedTime(time: DateType) {
    const date = new Date(time.toString());
    const h = date.getHours();
    const m = date.getMinutes();

    return `${h}:${m}`;
  }

  function _getTimeTemplate(schedule: ISchedule , isAllDay: boolean) {
    let html : Array<string> = [];

    if (!isAllDay) {
      html.push("<strong>" + _getFormattedTime(schedule.start!) + "</strong> ");
    }
    if (schedule.isPrivate) {
      html.push('<span class="calendar-font-icon ic-lock-b"></span>');
      html.push(" Private");
    } else {
      if (schedule.isReadOnly) {
        html.push('<span class="calendar-font-icon ic-readonly-b"></span>');
      } else if (schedule.recurrenceRule) {
        html.push('<span class="calendar-font-icon ic-repeat-b"></span>');
      } else if (schedule.attendees!.length) {
        html.push('<span class="calendar-font-icon ic-user-b"></span>');
      } else if (schedule.location) {
        html.push('<span class="calendar-font-icon ic-location-b"></span>');
      }
      html.push(" " + schedule.title);
    }

    return html.join("");
  }

  const templates = {
    time: function (schedule: ISchedule) {
      return _getTimeTemplate(schedule, false);
    }
  };

  return (
    <div className="w-full">
      <TUICalendar
        ref={cal}
        height="100vh"
        view="week"
        useDetailPopup={true}
        template={templates}
        calendars={calendars}
        events={schedules}
        onClickSchedule={onClickSchedule}
        onBeforeCreateSchedule={onBeforeCreateSchedule}
        onBeforeDeleteSchedule={onBeforeDeleteSchedule}
        onBeforeUpdateSchedule={onBeforeUpdateSchedule}
      />
    </div>
  );
}

export default Calendar;
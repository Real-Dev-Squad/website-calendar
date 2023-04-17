/* eslint-disable no-unused-vars */
import React from 'react';
import { Calendar, DateLocalizer } from 'react-big-calendar';
import dayjs from 'dayjs';
import localeData from 'dayjs/plugin/localeData';
import withDragAndDrop, { withDragAndDropProps } from 'react-big-calendar/lib/addons/dragAndDrop';
import { CalendarEventProps, CalEvent, UpdateEvent } from '~/utils/interfaces';

interface RdsCalendarProps {
  eventsList: CalEvent[];
  currentEvent: CalEvent | undefined;
  setCalendarEvent: React.Dispatch<React.SetStateAction<CalendarEventProps | undefined>>;
  // eslint-disable-next-line no-unused-vars
  updateEvent: ({ event, start, end }: UpdateEvent) => void;
}

dayjs.extend(localeData);

const dateRangeFormat = ({ start, end }: any, culture: any, local: any) =>
  `${local.format(start, 'L', culture)} - ${local.format(end, 'L', culture)}`;

const timeRangeFormat = ({ start, end }: any, culture: any, local: any) =>
  `${local.format(start, 'LT', culture)} - ${local.format(end, 'LT', culture)}`;

const timeRangeStartFormat = ({ start }: any, culture: any, local: any) =>
  `${local.format(start, 'LT', culture)} - `;

const timeRangeEndFormat = ({ end }: any, culture: any, local: any) =>
  ` - ${local.format(end, 'LT', culture)}`;

const weekRangeFormat = ({ start, end }: any, culture: any, local: any) =>
  `${local.format(start, 'MMMM DD', culture)} - ${local.format(
    end,
    local.eq(start, end, 'month') ? 'DD' : 'MMMM DD',
    culture,
  )}`;

const formats = {
  dateFormat: 'DD',
  dayFormat: 'DD ddd',
  weekdayFormat: 'ddd',

  selectRangeFormat: timeRangeFormat,
  eventTimeRangeFormat: timeRangeFormat,
  eventTimeRangeStartFormat: timeRangeStartFormat,
  eventTimeRangeEndFormat: timeRangeEndFormat,

  timeGutterFormat: 'LT',

  monthHeaderFormat: 'MMMM YYYY',
  dayHeaderFormat: 'dddd MMM DD',
  dayRangeHeaderFormat: weekRangeFormat,
  agendaHeaderFormat: dateRangeFormat,

  agendaDateFormat: 'ddd MMM DD',
  agendaTimeFormat: 'LT',
  agendaTimeRangeFormat: timeRangeFormat,
};

const dayjsLocalizer = () => {
  const locale = (m: any, c: any) => (c ? m.locale(c) : m);

  return new DateLocalizer({
    formats,
    firstOfWeek(culture) {
      const data = dayjs.localeData();
      return data ? data.firstDayOfWeek() : 0;
    },

    format(value, format, culture) {
      return locale(dayjs(value), culture).format(format);
    },
  });
};

const localizer = dayjsLocalizer();

const RdsCalendar = ({
  eventsList,
  currentEvent,
  setCalendarEvent,
  updateEvent,
}: RdsCalendarProps) => {
  const RbcCalendar = withDragAndDrop(Calendar);
  const onEventDrop: withDragAndDropProps['onEventDrop'] = (ev: UpdateEvent) => updateEvent(ev);
  const onEventResize: withDragAndDropProps['onEventResize'] = (ev: UpdateEvent) => updateEvent(ev);

  return (
    <RbcCalendar
      localizer={localizer}
      events={eventsList}
      defaultView="week"
      style={{ height: '100vh' }}
      onSelectEvent={(event) =>
        setCalendarEvent((e) => ({
          ...e,
          event,
          show: true,
          new: false,
        }))
      }
      onEventDrop={onEventDrop}
      onEventResize={onEventResize}
      selectable={true}
      scrollToTime={dayjs(currentEvent?.start).toDate()}
      onSelectSlot={({ start }) => {
        const event: CalEvent = { title: '', start, end: dayjs(start).add(1, 'hour').toDate() };
        setCalendarEvent((e) => ({
          ...e,
          event,
          show: true,
          new: true,
        }));
      }}
    />
  );
};

export default React.memo(RdsCalendar);

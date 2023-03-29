import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import dayjs from 'dayjs';
import withDragAndDrop, { withDragAndDropProps } from 'react-big-calendar/lib/addons/dragAndDrop';
import { CalendarEventProps, CalEvent, UpdateEvent } from '~/utils/interfaces';

interface RdsCalendarProps {
  eventsList: CalEvent[];
  currentEvent: CalEvent | undefined;
  setCalendarEvent: React.Dispatch<React.SetStateAction<CalendarEventProps | undefined>>;
  updateEvent: ({ event, start, end }: UpdateEvent) => void;
}

// TODO: localize with dayjs instead of moment
const localizer = momentLocalizer(moment);

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

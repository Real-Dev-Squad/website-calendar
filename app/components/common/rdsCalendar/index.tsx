import React from 'react';
import { Calendar, momentLocalizer, View } from 'react-big-calendar';
import { useNavigate } from '@remix-run/react';
import dayjs from 'dayjs';
import moment from 'moment';
import withDragAndDrop, { withDragAndDropProps } from 'react-big-calendar/lib/addons/dragAndDrop';
import { CalendarEventProps, CalEvent, UpdateEvent } from '~/utils/interfaces';

interface RdsCalendarProps {
  height?: string;
  view?: View;
  eventsList: CalEvent[];
  defaultDate?: Date;
  currentEvent: CalEvent | undefined;
  setCalendarEvent?: React.Dispatch<React.SetStateAction<CalendarEventProps>>;
  updateEvent?: (event: CalEvent) => void;
}

const localizer = momentLocalizer(moment);

const RdsCalendar = ({
  height,
  view,
  eventsList,
  defaultDate,
  currentEvent,
  updateEvent,
}: RdsCalendarProps) => {
  const RbcCalendar = withDragAndDrop(Calendar);
  const onEventDrop: withDragAndDropProps['onEventDrop'] = (ev: UpdateEvent) =>
    updateEvent({ ...ev.event, start: dayjs(ev.start).toDate(), end: dayjs(ev.end).toDate() });
  const onEventResize: withDragAndDropProps['onEventResize'] = (ev: UpdateEvent) =>
    updateEvent({ ...ev.event, start: dayjs(ev.start).toDate(), end: dayjs(ev.end).toDate() });
  const navigate = useNavigate();

  return (
    <RbcCalendar
      localizer={localizer}
      events={eventsList}
      defaultDate={defaultDate}
      defaultView={view ?? 'week'}
      style={{ height: height ?? '100vh' }}
      onSelectEvent={(event: CalEvent) => {
        navigate(`/calendar/${event?.id}`);
      }}
      onEventDrop={onEventDrop}
      onEventResize={onEventResize}
      selectable={true}
      scrollToTime={dayjs(currentEvent?.start).toDate()}
      onSelectSlot={(ev: CalEvent) => {
        navigate('/calendar/new', {
          state: { start: dayjs(ev.start).toDate(), end: dayjs(ev.end).toDate() },
        });
      }}
      onView={(view) => console.log(view)}
    />
  );
};

export default React.memo(RdsCalendar);

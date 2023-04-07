// TODO: remove all eslint-disable when eslint-prettier issue is fixed
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable object-curly-newline */
/* eslint-disable no-unused-vars */
import React from 'react';
import { Calendar, momentLocalizer, View } from 'react-big-calendar';
import moment from 'moment';
import withDragAndDrop, { withDragAndDropProps } from 'react-big-calendar/lib/addons/dragAndDrop';
import { CalendarEventProps, CalEvent, UpdateEvent } from '~/utils/interfaces';

interface RdsCalendarProps {
  height?: string;
  view?: View;
  eventsList: CalEvent[];
  defaultDate?: Date;
  currentEvent: CalEvent | undefined;
  setCalendarEvent: React.Dispatch<React.SetStateAction<CalendarEventProps>>;
  updateEvent: (event: CalEvent) => void;
}

const localizer = momentLocalizer(moment);

const RdsCalendar = ({
  height,
  view,
  eventsList,
  defaultDate,
  currentEvent,
  setCalendarEvent,
  updateEvent,
}: RdsCalendarProps) => {
  const RbcCalendar = withDragAndDrop(Calendar);
  const onEventDrop: withDragAndDropProps['onEventDrop'] = (ev: UpdateEvent) =>
    updateEvent({ ...ev.event, start: moment(ev.start).toDate(), end: moment(ev.end).toDate() });
  const onEventResize: withDragAndDropProps['onEventResize'] = (ev: UpdateEvent) =>
    updateEvent({ ...ev.event, start: moment(ev.start).toDate(), end: moment(ev.end).toDate() });

  return (
    <RbcCalendar
      localizer={localizer}
      events={eventsList}
      defaultDate={defaultDate}
      defaultView={view ?? 'week'}
      style={{ height: height ?? '100vh' }}
      onSelectEvent={(event) => setCalendarEvent((e) => ({ ...e, event, show: true, new: false }))}
      onEventDrop={onEventDrop}
      onEventResize={onEventResize}
      selectable={true}
      scrollToTime={moment(currentEvent?.start).toDate()}
      onSelectSlot={({ start }) => {
        const event: CalEvent = { title: '', start, end: moment(start).add(1, 'hour').toDate() };
        setCalendarEvent((e) => ({ ...e, event, show: true, new: true }));
      }}
    />
  );
};

export default React.memo(RdsCalendar);

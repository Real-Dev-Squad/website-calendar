import React from 'react';
import { Calendar, dayjsLocalizer, View } from 'react-big-calendar';
import { useNavigate } from '@remix-run/react';
import dayjs from 'dayjs';
import withDragAndDrop, { withDragAndDropProps } from 'react-big-calendar/lib/addons/dragAndDrop';
import { CalendarEventProps, CalEvent, UpdateEvent } from '~/utils/interfaces';
import { useStore } from '../../../store/useStore';

interface RdsCalendarProps {
  height?: string;
  view?: View;
  eventsList: CalEvent[];
  defaultDate?: Date;
  currentEvent: CalEvent | undefined;
  setCalendarEvent?: React.Dispatch<React.SetStateAction<CalendarEventProps>>;
  updateEvent: (event: CalEvent) => void;
}

const localizer = dayjsLocalizer(dayjs);

const RdsCalendar = ({
  height,
  view,
  eventsList,
  defaultDate,
  currentEvent,
  updateEvent,
}: RdsCalendarProps) => {
  const [date, setDate] = React.useState(dayjs(currentEvent?.start).toDate());
  const RbcCalendar = withDragAndDrop(Calendar);
  const onEventDrop: withDragAndDropProps['onEventDrop'] = (ev: UpdateEvent) => updateEvent({ ...ev.event, start: dayjs(ev.start).toDate(), end: dayjs(ev.end).toDate() });
  const onEventResize: withDragAndDropProps['onEventResize'] = (ev: UpdateEvent) => updateEvent({ ...ev.event, start: dayjs(ev.start).toDate(), end: dayjs(ev.end).toDate() });
  const navigate = useNavigate();
  const setView = useStore((state) => state.setView);

  const handleNavigate = (localDate: any) => {
    setDate(dayjs(localDate).toDate());
  };

  return (
    <RbcCalendar
      localizer={localizer}
      events={eventsList}
      defaultDate={defaultDate}
      defaultView={view}
      style={{ height: height ?? '100vh' }}
      onSelectEvent={(event: CalEvent) => {
        navigate(`/event/${event.id}`);
      }}
      date={date}
      onEventDrop={onEventDrop}
      onEventResize={onEventResize}
      selectable={true}
      scrollToTime={dayjs(currentEvent?.start).toDate()}
      onSelectSlot={(ev: CalEvent) => {
        navigate('/event/new', {
          state: { start: dayjs(ev.start).toDate(), end: dayjs(ev.end).toDate() },
        });
      }}
      onView={(v: View) => setView(v)}
      onNavigate={(e) => handleNavigate(e)}
    />
  );
};

export default React.memo(RdsCalendar);

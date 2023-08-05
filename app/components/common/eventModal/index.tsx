import { useEffect, useState } from 'react';
import {
  Form,
  useNavigate,
  useParams,
  useLocation,
  ShouldRevalidateFunction,
} from '@remix-run/react';
import dayjs from 'dayjs';
import DatePicker from 'react-datepicker';
import { CalendarEventProps, CalEvent } from '~/utils/interfaces';
import { useStore } from '../../../store/useStore';
import UserInput from '../userInput';
import EventVisibility from '../eventVisibility';
import EmailChipsInput from '../emailChipsInput';
import { Button } from '../../Button';

interface EventModalProps {
  event: CalEvent;
  statuses: 'idle' | 'loading';
}
// This function lets apps optimize which routes data should be
// reloaded after actions and for client-side navigations.
// https://remix.run/docs/en/main/route/should-revalidate
export const unstableShouldReload: ShouldRevalidateFunction = () => false;

export default function EventModal({ event, statuses = 'idle' }: EventModalProps) {
  useStore((state: any) => state);
  const [calendarEvent, setCalendarEvent] = useState<CalendarEventProps>({
    event,
  });
  const params = useParams();
  const navigate = useNavigate();
  const routerLocation = useLocation() as { state: { start: string; end: string } };

  const currentEvent = calendarEvent.event!;
  const minDate = dayjs(currentEvent.start);
  const maxDate = dayjs(currentEvent.end);

  const dateRange = (startDate: Date, endDate: Date) => {
    const difference = dayjs(endDate).diff(startDate, 'minutes');
    const resultArray: Date[] = [startDate];

    for (let minute = 1; minute <= difference; minute += 1) {
      resultArray.push(dayjs(startDate).add(minute, 'minutes').toDate());
    }
    return resultArray;
  };

  useEffect(() => {
    if (params.eventId === 'new' && routerLocation.state) {
      setCalendarEvent((e) => ({
        ...e,
        event: {
          ...e.event,
          start: dayjs(routerLocation.state.start).toDate(),
          end: dayjs(routerLocation.state.end).toDate(),
        },
      }));
    }
  }, [routerLocation.state]);

  return (
    <Form method="patch">
      <div className="p-4 h-full w-full md:w-[400px] border-r-[1px] border-stone-50 overflow-auto">
        <div>
          <button
            data-testid="modal-close-btn"
            className="rounded-lg outline-none cursor-pointer py-2 px-4 text-sm bg-neutral-100 border-neutral-200 border-[1px] text-neutral-500"
            aria-label="Close"
            onClick={() => navigate('/')}
          >
            CLOSE
          </button>
        </div>

        <div className="p-2">
          <div>
            <UserInput
              disabled={statuses === 'loading'}
              dataTestId="modal-title"
              label=""
              name="title"
              placeholder="Enter Event Title"
              inputClassnames="border-none font-normal text-2xl mb-4 text-stone-500 m-0 !bg-white"
              value={currentEvent?.title?.toString() ?? ''}
              setValue={(title) =>
                setCalendarEvent((e) => ({ ...e, event: { ...e.event, title } }))
              }
              isEventTitle={true}
            />
          </div>

          <EventVisibility
            visibility={currentEvent?.visibility ?? 'private'}
            setVisibility={(visibility) =>
              setCalendarEvent((e) => ({ ...e, event: { ...e.event, visibility } }))
            }
          />

          <div className="mt-2">
            <div data-testid="modal-from-date">
              <p className="text-4 mb-2">From</p>
              <DatePicker
                disabled={statuses === 'loading'}
                placeholderText="from-date"
                className="bg-stone-50 text-4 p-3 mb-6 focus:outline-none border border-solid border-stone-400 rounded-lg w-full cursor-pointer"
                selected={minDate.toDate()}
                maxDate={maxDate.toDate()}
                timeIntervals={5}
                excludeTimes={dateRange(maxDate.toDate(), dayjs(maxDate).endOf('day').toDate())}
                onChange={(start) => {
                  if (dayjs(start) < maxDate) {
                    setCalendarEvent((e) => ({
                      ...e,
                      event: { ...e.event, start: dayjs(start).toDate() },
                    }));
                  }
                }}
                showTimeSelect
                dateFormat="MMMM d, yyyy h:mm aa"
              />
            </div>

            <div data-testid="modal-to-date">
              <p className="text-4 mb-2">To</p>
              <DatePicker
                disabled={statuses === 'loading'}
                placeholderText="to-date"
                className="bg-stone-50 text-4 p-3 mb-6 focus:outline-none border border-solid border-stone-400 rounded-lg w-full cursor-pointer"
                minDate={minDate.toDate()}
                selected={maxDate.toDate()}
                timeIntervals={5}
                excludeTimes={dateRange(dayjs(minDate).startOf('day').toDate(), minDate.toDate())}
                onChange={(end) => {
                  if (minDate < dayjs(end)) {
                    setCalendarEvent((e) => ({
                      ...e,
                      event: { ...e.event, end: dayjs(end).toDate() },
                    }));
                  }
                }}
                showTimeSelect
                dateFormat="MMMM d, yyyy h:mm aa"
              />
            </div>

            <EmailChipsInput
              label="Attendees Emails"
              placeholder="Attendees Emails"
              attendees={currentEvent?.attendees ?? []}
              setAttendees={(attendees) =>
                setCalendarEvent((ev) => ({ ...ev, event: { ...ev.event, attendees } }))
              }
            />

            <UserInput
              disabled={statuses === 'loading'}
              dataTestId="modal-location"
              label="URL / Address"
              name="address"
              labelClassnames="text-4"
              placeholder="Enter URL or Address for the event"
              value={currentEvent?.location ?? ''}
              setValue={(location) =>
                setCalendarEvent((ev) => ({ ...ev, event: { ...ev.event, location } }))
              }
            />

            <p className="text-4 mb-2">Description</p>
            <textarea
              disabled={statuses === 'loading'}
              aria-label="Event Description"
              className="bg-stone-50 text-4 p-3 mb-6 focus:outline-none border border-solid border-stone-400 rounded-lg w-full"
              rows={2}
              cols={50}
              name="description"
              placeholder="Event Description"
              value={currentEvent?.description ?? ''}
              onChange={(e) =>
                setCalendarEvent((ev) => ({
                  ...ev,
                  event: { ...ev.event, description: e.target.value },
                }))
              }
            ></textarea>
            <input type="text" name="event" defaultValue={event.toString()} className="hidden" />
            <input
              type="text"
              name="calendarId"
              defaultValue={
                typeof window !== 'undefined' ? localStorage?.getItem('calendarId')?.toString() : ''
              }
              className="hidden"
            />
            <Button
              dataTestId="modal-save-btn"
              label={statuses === 'loading' ? 'submitting...' : 'Submit'}
              type="submit"
              disabled={!currentEvent.title}
            />
          </div>
        </div>
      </div>
    </Form>
  );
}

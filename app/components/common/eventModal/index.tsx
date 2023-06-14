import React from 'react';
import { Form, useNavigate, useParams, useLocation } from '@remix-run/react';
import axios from 'axios';
import * as Dialog from '@radix-ui/react-dialog';
import dayjs from 'dayjs';
import DatePicker from 'react-datepicker';
import { toast } from 'react-toastify';
import { CalendarEventProps, CalEvent } from '~/utils/interfaces';
import { useStore } from '../../../store/useStore';
import UserInput from '../userInput';
import RdsCalendar from '../rdsCalendar';
import EventVisibility from '../eventVisibility';
import EmailChipsInput from '../emailChipsInput';
import { Button } from '../../Button';
import { patchEvent, postEvent } from '../../../constants/urls.constants';
import { parseEventToCreateOrUpdateEventPayload, parseEvents } from '../../../utils/event.utils';

interface EventModalProps {
  events: CalEvent[];
  currentEvent: CalEvent;
  createEvent?: (event: CalEvent) => void;
  setCalendarEvent: React.Dispatch<React.SetStateAction<CalendarEventProps>>;
}

export default function EventModal({ events, currentEvent, setCalendarEvent }: EventModalProps) {
  console.log('rerender', currentEvent);

  const { updateEvent, addEvent, view } = useStore((state) => state);
  const params = useParams();
  const navigate = useNavigate();
  const routerLocation = useLocation() as { state: { start: string; end: string } };
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

  const updateEventStateFromModal = (event: CalEvent) => {
    setCalendarEvent((e) => ({ ...e, event }));
  };

  React.useEffect(() => {
    if (params.eventId === 'new') {
      setCalendarEvent((e) => ({
        ...e,
        start: dayjs(routerLocation.state.start),
        end: dayjs(routerLocation.state.end),
      }));
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // grab the form element
    const $form = e.currentTarget;

    // get the payload from the form

    if (params.eventId !== 'new') {
      const payload = parseEventToCreateOrUpdateEventPayload($form, currentEvent);
      try {
        const response = await axios(
          patchEvent(
            window.ENV.API_HOST,
            parseInt(params.eventId ? params.eventId : '', 10) as number,
          ),
          {
            method: 'patch',
            data: payload,
            withCredentials: true,
          },
        );

        updateEvent(parseEvents([{ ...response.data.data }])[0]);
        navigate('/');
      } catch (error) {
        toast.error('unable to update event', {
          toastId: 'events_error',
        });
      }
      return;
    }

    try {
      const postPayload = parseEventToCreateOrUpdateEventPayload($form, currentEvent);
      const response = await axios(postEvent(window.ENV.API_HOST), {
        method: 'post',
        data: postPayload,
        withCredentials: true,
      });
      addEvent(parseEvents([{ ...response.data.data }])[0]);
      toast.success('successfully added event', {
        toastId: 'events_success',
      });
      navigate('/');
    } catch (error) {
      toast.error('unable to add event', {
        toastId: 'events_error',
      });
    }
  };

  return (
    <Dialog.Root open={true}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-20 bg-black bg-opacity-40 animate-overlayShow duration-150 transition-timing-cubic-bezier-0.16-1-0.3-1" />
        <Dialog.Content className="z-30 fixed top-0 left-0 w-screen h-screen my-0 box-border bg-white rounded-lg shadow-lg animate-contentShow duration-150 transition-timing-cubic-bezier-0.16-1-0.3-1 focus:outline-none">
          <div className="h-full w-full flex">
            <Form method="patch" onSubmit={handleSubmit}>
              <div className="p-4 h-full w-full md:w-[400px] border-r-[1px] border-stone-50 overflow-auto">
                <Dialog.Close asChild>
                  <button
                    data-testid="modal-close-btn"
                    className="rounded-lg outline-none cursor-pointer py-2 px-4 text-sm bg-neutral-100 border-neutral-200 border-[1px] text-neutral-500"
                    aria-label="Close"
                    onClick={() => navigate('/')}
                  >
                    CLOSE
                  </button>
                </Dialog.Close>

                <div className="p-2">
                  <Dialog.Title>
                    <UserInput
                      disabled={false}
                      dataTestId="modal-title"
                      label=""
                      name="title"
                      placeholder="Enter Event Title"
                      inputClassnames="border-none font-normal text-[32px] mb-4 text-stone-500 m-0 !bg-white"
                      value={currentEvent?.title?.toString() ?? ''}
                      setValue={(title) => setCalendarEvent((e) => ({ ...e, title }))}
                    />
                  </Dialog.Title>

                  <EventVisibility
                    visibility={currentEvent?.visibility ?? 'private'}
                    setVisibility={(visibility) => setCalendarEvent((e) => ({ ...e, visibility }))}
                  />

                  <div className="mt-2">
                    <div data-testid="modal-from-date">
                      <p className="text-4 mb-2">From</p>
                      <DatePicker
                        disabled={false}
                        placeholderText="from-date"
                        className="bg-stone-50 text-4 p-3 mb-6 focus:outline-none border border-solid border-stone-400 rounded-lg w-full cursor-pointer"
                        selected={minDate.toDate()}
                        maxDate={maxDate.toDate()}
                        timeIntervals={5}
                        excludeTimes={dateRange(
                          maxDate.toDate(),
                          dayjs(maxDate).endOf('day').toDate(),
                        )}
                        onChange={(start) => {
                          if (dayjs(start) < maxDate) {
                            setCalendarEvent((e) => ({ ...e, start: dayjs(start).toDate() }));
                          }
                        }}
                        showTimeSelect
                        dateFormat="MMMM d, yyyy h:mm aa"
                      />
                    </div>

                    <div data-testid="modal-to-date">
                      <p className="text-4 mb-2">To</p>
                      <DatePicker
                        disabled={false}
                        placeholderText="to-date"
                        className="bg-stone-50 text-4 p-3 mb-6 focus:outline-none border border-solid border-stone-400 rounded-lg w-full cursor-pointer"
                        minDate={minDate.toDate()}
                        selected={maxDate.toDate()}
                        timeIntervals={5}
                        excludeTimes={dateRange(
                          dayjs(minDate).startOf('day').toDate(),
                          minDate.toDate(),
                        )}
                        onChange={(end) => {
                          if (minDate < dayjs(end)) {
                            setCalendarEvent((e) => ({ ...e, end: dayjs(end).toDate() }));
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
                      setAttendees={(attendees) => setCalendarEvent((ev) => ({ ...ev, attendees }))}
                    />

                    <UserInput
                      disabled={false}
                      dataTestId="modal-location"
                      label="URL / Address"
                      name="address"
                      labelClassnames="text-4"
                      placeholder="Enter URL or Address for the event"
                      value={currentEvent?.location ?? ''}
                      setValue={(location) => setCalendarEvent((ev) => ({ ...ev, location }))}
                    />

                    <p className="text-4 mb-2">Description</p>
                    <textarea
                      disabled={false}
                      aria-label="Event Description"
                      className="bg-stone-50 text-4 p-3 mb-6 focus:outline-none border border-solid border-stone-400 rounded-lg w-full"
                      rows={2}
                      cols={50}
                      name="description"
                      placeholder="Event Description"
                      value={currentEvent?.description ?? ''}
                      onChange={(e) =>
                        setCalendarEvent((ev) => ({ ...ev, description: e.target.value }))
                      }
                    ></textarea>

                    <Button
                      dataTestId="modal-save-btn"
                      label={'Submit'}
                      type="submit"
                      disabled={!currentEvent.title}
                    />
                  </div>
                </div>
              </div>
            </Form>
            <div className="flex-auto hidden md:block">
              <RdsCalendar
                height="100%"
                view={view}
                eventsList={events}
                defaultDate={currentEvent?.start}
                currentEvent={currentEvent}
                setCalendarEvent={setCalendarEvent}
                updateEvent={updateEventStateFromModal}
              />
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

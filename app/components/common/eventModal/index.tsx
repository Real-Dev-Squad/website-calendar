/* eslint-disable comma-dangle */
/* eslint-disable no-unused-vars */
/* eslint-disable object-curly-newline */
/* eslint-disable implicit-arrow-linebreak */
import * as Dialog from '@radix-ui/react-dialog';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import { CalendarEventProps, CalEvent } from '~/utils/interfaces';
import UserInput from '../userInput';
import RdsCalendar from '../rdsCalendar';
import EventVisibility from '../eventVisibility';
import EmailChipsInput from '../emailChipsInput';
import { Button } from '../../Button';

interface EventModalProps {
  event?: CalEvent;
  eventsList: CalEvent[];
  currentEvent: CalEvent | undefined;
  createEvent?: (event: CalEvent) => void;
  updateEvent: (event: CalEvent) => void;
  isOpen?: boolean;
  setIsOpen: (show: boolean) => void;
  newEvent?: boolean;
  setCalendarEvent: React.Dispatch<React.SetStateAction<CalendarEventProps>>;
}

export default function EventModal({
  event,
  eventsList,
  currentEvent,
  createEvent,
  updateEvent,
  isOpen = true,
  setIsOpen,
  newEvent = false,
  setCalendarEvent,
}: EventModalProps) {
  const [eventDetail, setEventDetail] = useState<CalEvent | undefined>(event);

  const minDate = moment(eventDetail?.start);
  const maxDate = moment(eventDetail?.end);

  useEffect(() => {
    setEventDetail({ ...eventDetail, title: event?.title, start: event?.start, end: event?.end });
  }, [event]);

  const dateRange = (startDate: Date, endDate: Date) => {
    const difference = moment(endDate).diff(startDate, 'minutes');
    const resultArray: Date[] = [startDate];

    for (let minute = 1; minute <= difference; minute += 1) {
      resultArray.push(moment(startDate).add(minute, 'minutes').toDate());
    }
    return resultArray;
  };

  return (
    <Dialog.Root open={isOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-20 bg-black bg-opacity-40 animate-overlayShow duration-150 transition-timing-cubic-bezier-0.16-1-0.3-1" />
        <Dialog.Content className="z-30 fixed top-0 left-0 w-screen h-[95vh] my-6 box-border bg-white rounded-lg shadow-lg animate-contentShow duration-150 transition-timing-cubic-bezier-0.16-1-0.3-1 focus:outline-none">
          <div className="h-full w-full flex">
            <div className="p-4 h-full w-[400px] border-r-[1px] border-stone-50 overflow-auto">
              <Dialog.Close asChild>
                <button
                  data-testid="modal-close-btn"
                  className="rounded-lg outline-none cursor-pointer py-2 px-4 text-sm bg-neutral-100 border-neutral-200 border-[1px] text-neutral-500"
                  aria-label="Close"
                  onClick={() => setIsOpen(false)}
                >
                  CLOSE
                </button>
              </Dialog.Close>

              <div className="p-2">
                <Dialog.Title>
                  <UserInput
                    dataTestId="modal-title"
                    label=""
                    placeholder="Enter Event Title"
                    inputClassnames="border-none font-normal text-[32px] mb-4 text-stone-500 m-0 !bg-white"
                    value={eventDetail?.title?.toString() ?? ''}
                    setValue={(title) => setEventDetail((ev) => ({ ...ev, title }))}
                  />
                </Dialog.Title>

                <EventVisibility
                  visibility={eventDetail?.visibility ?? 'private'}
                  setVisibility={(visibility) => setEventDetail((e) => ({ ...e, visibility }))}
                />

                <div className="mt-2">
                  <div data-testid="modal-from-date">
                    <p className="text-4 mb-2">From</p>
                    <DatePicker
                      placeholderText="from-date"
                      className="bg-stone-50 text-4 p-3 mb-6 focus:outline-none border border-solid border-stone-400 rounded-lg w-full cursor-pointer"
                      selected={minDate.toDate()}
                      maxDate={maxDate.toDate()}
                      timeIntervals={5}
                      excludeTimes={dateRange(
                        maxDate.toDate(),
                        moment(maxDate).endOf('day').toDate()
                      )}
                      onChange={(start) => {
                        if (moment(start) < maxDate) {
                          setEventDetail((e) => ({ ...e, start: moment(start).toDate() }));
                        }
                      }}
                      showTimeSelect
                      dateFormat="MMMM d, yyyy h:mm aa"
                    />
                  </div>

                  <div data-testid="modal-to-date">
                    <p className="text-4 mb-2">To</p>
                    <DatePicker
                      placeholderText="to-date"
                      className="bg-stone-50 text-4 p-3 mb-6 focus:outline-none border border-solid border-stone-400 rounded-lg w-full cursor-pointer"
                      minDate={minDate.toDate()}
                      selected={maxDate.toDate()}
                      timeIntervals={5}
                      excludeTimes={dateRange(
                        moment(minDate).startOf('day').toDate(),
                        minDate.toDate()
                      )}
                      onChange={(end) => {
                        if (minDate < moment(end)) {
                          setEventDetail((e) => ({ ...e, end: moment(end).toDate() }));
                        }
                      }}
                      showTimeSelect
                      dateFormat="MMMM d, yyyy h:mm aa"
                    />
                  </div>

                  <EmailChipsInput
                    label="Attendees Emails"
                    placeholder="Attendees Emails"
                    attendees={eventDetail?.attendees ?? []}
                    setAttendees={(attendees) => setEventDetail((ev) => ({ ...ev, attendees }))}
                  />

                  <UserInput
                    dataTestId="modal-location"
                    label="URL / Address"
                    labelClassnames="text-4"
                    placeholder="Enter URL or Address for the event"
                    value={eventDetail?.location ?? ''}
                    setValue={(location) => setEventDetail((ev) => ({ ...ev, location }))}
                  />

                  <p className="text-4 mb-2">Description</p>
                  <textarea
                    aria-label="Event Description"
                    className="bg-stone-50 text-4 p-3 mb-6 focus:outline-none border border-solid border-stone-400 rounded-lg w-full"
                    rows={2}
                    cols={50}
                    placeholder="Event Description"
                    value={eventDetail?.description ?? ''}
                    onChange={(e) =>
                      setEventDetail((ev) => ({ ...ev, description: e.target.value }))
                    }
                  ></textarea>

                  <Button
                    dataTestId="modal-save-btn"
                    label="Save"
                    handleClick={() => {
                      if (eventDetail) {
                        if (createEvent && newEvent) {
                          createEvent({ ...eventDetail, id: '4' });
                        } else if (updateEvent) {
                          updateEvent(eventDetail);
                        }
                      }
                      setIsOpen(false);
                    }}
                  />
                </div>
              </div>
            </div>

            <div className="flex-auto">
              <RdsCalendar
                height="100%"
                view="day"
                eventsList={eventsList}
                defaultDate={currentEvent?.start}
                currentEvent={currentEvent}
                setCalendarEvent={setCalendarEvent}
                updateEvent={updateEvent}
              />
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

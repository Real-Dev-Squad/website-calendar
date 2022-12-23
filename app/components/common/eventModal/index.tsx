import { Dialog, Transition } from '@headlessui/react';
import moment from 'moment';
import { Fragment, useState } from 'react';
import { CalEvent, UpdateEvent } from '~/utils/interfaces';
import UserInput from '../userInput';

interface EventModalProps {
  event?: CalEvent;
  updateEvent?: ({ event, start, end }: UpdateEvent) => void;
  createEvent?: (event: CalEvent) => void;
  isOpen?: boolean;
  setIsOpen: (show: boolean) => void;
  newEvent?: boolean;
}

export default function EventModal({
  event,
  updateEvent,
  createEvent,
  isOpen = true,
  setIsOpen,
  newEvent = false,
}: EventModalProps) {
  const [eventDetail, setEventDetail] = useState<CalEvent | undefined>(event);
  function closeModal() {
    setIsOpen(false);
  }

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <UserInput
                  label={''}
                  placeholder={'Enter event title'}
                  value={eventDetail?.title?.toString() ?? ''}
                  setValue={(title) => setEventDetail((e) => ({ ...e, title }))}
                />
                <div className="mt-2">
                  <UserInput
                    label={''}
                    placeholder={'Enter start date and time'}
                    type="datetime-local"
                    value={moment(eventDetail?.start).format('YYYY-MM-DDTHH:mm') ?? ''}
                    setValue={(start) =>
                      setEventDetail((e) => ({ ...e, start: moment(start).toDate() }))
                    }
                  />
                  <UserInput
                    label={''}
                    placeholder={'Enter start date and time'}
                    type="datetime-local"
                    value={moment(eventDetail?.end).format('YYYY-MM-DDTHH:mm') ?? ''}
                    setValue={(end) => setEventDetail((e) => ({ ...e, end: moment(end).toDate() }))}
                  />
                </div>

                <div className="mt-4 flex gap-2">
                  <button
                    type="button"
                    className="inline-flex justify-center rounded-md bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200"
                    onClick={() => setIsOpen(false)}
                  >
                    cancel
                  </button>
                  <button
                    type="button"
                    className="inline-flex justify-center rounded-md bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200"
                    onClick={() => {
                      if (eventDetail) {
                        if (createEvent && newEvent) {
                          createEvent({ ...eventDetail, id: '4' });
                        } else if (updateEvent) {
                          updateEvent({
                            event: eventDetail,
                            start: eventDetail.start ?? '',
                            end: eventDetail.end ?? '',
                          });
                        }
                      }
                      setIsOpen(false);
                    }}
                  >
                    save
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}

import * as Dialog from '@radix-ui/react-dialog';
import { Cross2Icon } from '@radix-ui/react-icons';
import moment from 'moment';
import { useState } from 'react';
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

  return (
    <Dialog.Root open={isOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className="DialogOverlay" />
        <Dialog.Content className="DialogContent">
          <Dialog.Title className="DialogTitle">Edit Event</Dialog.Title>
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
              setValue={(start) => setEventDetail((e) => ({ ...e, start: moment(start).toDate() }))}
            />
            <UserInput
              label={''}
              placeholder={'Enter start date and time'}
              type="datetime-local"
              value={moment(eventDetail?.end).format('YYYY-MM-DDTHH:mm') ?? ''}
              setValue={(end) => setEventDetail((e) => ({ ...e, end: moment(end).toDate() }))}
            />
          </div>
          <div style={{ display: 'flex', marginTop: 25, justifyContent: 'flex-end' }}>
            <div className="mt-2 flex gap-2">
              <button className="Button red" onClick={() => setIsOpen(false)}>
                cancel
              </button>
              <button
                className="Button green"
                onClick={() => {
                  if (eventDetail) {
                    if (createEvent && newEvent) {
                      createEvent({ ...eventDetail, id: 4 });
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
                Save changes
              </button>
            </div>
            <Dialog.Close asChild></Dialog.Close>
          </div>
          <Dialog.Close asChild>
            <button className="IconButton" aria-label="Close" onClick={() => setIsOpen(false)}>
              <Cross2Icon />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

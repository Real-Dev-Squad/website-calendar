import dayjs from 'dayjs';
import Select from 'react-select';
import { useState } from 'react';
import { ChevronDownIcon } from '@heroicons/react/24/solid';
import Drawer from '~/components/common/drawer';
import SocialEventCard from '~/components/common/socialEventCard';
import Navbar from '~/components/common/navbar';
import { socialMockEvents } from '~/constants/socialEvents.constants';
import { CalEvent } from '~/utils/interfaces';
import { monthsArray } from '~/constants/months.constants';
import { monthDropdownStyle } from '~/styles/monthDropdownStyle';

const DropdownIndicator = () => (
  <ChevronDownIcon className="h-5 w-5 mt-2 ml-1" aria-hidden="true" />
);

export default function socialEvents() {
  const [selectedEvent, setSelectedEvent] = useState<CalEvent | null>(null);
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState(monthsArray[dayjs().month()]);

  const toggleDrawer = (event?: CalEvent) => {
    setSelectedEvent(event || null);
    setIsDrawerVisible((isDrawerOpen) => !isDrawerOpen);
  };

  return (
    <>
      <div className="flex">
        <Navbar />
        <div className="flex flex-col mx-10">
          <div className="flex items-center gap-2 font-semibold text-2xl my-6">
            Events in{' '}
            <span className="border-b text-slate-500 border-slate-500">
              <Select
                value={{ label: selectedMonth, value: selectedMonth }}
                onChange={(selectedOption) => setSelectedMonth(selectedOption?.value || '')}
                options={monthsArray.map((month) => ({ label: month, value: month }))}
                styles={monthDropdownStyle}
                classNamePrefix="select"
                components={{ DropdownIndicator }}
              />
            </span>
          </div>

          <div className="flex flex-start flex-wrap gap-20 justify-center">
            {socialMockEvents.map((socialEvent) => (
              <div
                onClick={() => {
                  toggleDrawer(socialEvent);
                }}
                className=""
              >
                <SocialEventCard {...socialEvent} />
              </div>
            ))}
          </div>
        </div>
        {selectedEvent && (
          <Drawer
            event={selectedEvent}
            isDrawerVisible={isDrawerVisible}
            toggleDrawer={toggleDrawer}
          />
        )}
      </div>
    </>
  );
}

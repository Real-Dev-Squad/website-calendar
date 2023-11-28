import dayjs from 'dayjs';
import axios from 'axios';
import Select from 'react-select';
import { useEffect, useState } from 'react';
import { ChevronDownIcon } from '@heroicons/react/24/solid';
import { useLoaderData } from '@remix-run/react';
import { LoaderFunction, json } from '@remix-run/node';
import { toast } from 'react-toastify';
import Drawer from '~/components/common/drawer';
import SocialEventCard from '~/components/common/socialEventCard';
import Navbar from '~/components/common/navbar';
import { CalEvent } from '~/utils/interfaces';
import { monthsArray } from '~/constants/months.constants';
import { monthDropdownStyle } from '~/styles/monthDropdownStyle';
import { getEnv } from '~/models/env.server';
import { getSocialEvents } from '~/constants/urls.constants';
import { parseEvents } from '~/utils/event.utils';

type LoaderData = {
  ENV: {
    NODE_ENV: 'development' | 'production' | 'test';
    API_HOST: string;
    GOOGLE_OAUTH: string;
    MICROSOFT_OAUTH: string;
  };
};

export const loader: LoaderFunction = async () => {
  const ENV = await getEnv();
  return json<LoaderData>({ ENV });
};

const DropdownIndicator = () => (
  <ChevronDownIcon className="h-5 w-5 mt-2 ml-1" aria-hidden="true" />
);

export default function SocialEvents() {
  const { ENV } = useLoaderData();
  const [socialEvents, setSocialEvents] = useState<CalEvent[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<CalEvent | null>(null);
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState(monthsArray[dayjs().month()]);

  const toggleDrawer = (event?: CalEvent) => {
    setSelectedEvent(event || null);
    setIsDrawerVisible((isDrawerOpen) => !isDrawerOpen);
  };

  const fetchSocialEvents = async () => {
    if (!ENV.API_HOST) return;

    const selectedMonthIndex = monthsArray.findIndex((month) => month === selectedMonth);

    const startTime = dayjs().month(selectedMonthIndex).startOf('month').unix() * 1000;
    const endTime = dayjs().month(selectedMonthIndex).endOf('month').unix() * 1000;

    try {
      const { data: socialEventsList } = await axios.get(
        getSocialEvents(ENV.API_HOST, startTime, endTime),
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        },
      );
      setSocialEvents(parseEvents(socialEventsList.data));
    } catch (error) {
      toast.error('Unable to fetch the events', {
        toastId: 'events_error',
      });
    }
  };

  useEffect(() => {
    fetchSocialEvents();
  }, [selectedMonth]);

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
            {socialEvents.map((socialEvent) => (
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

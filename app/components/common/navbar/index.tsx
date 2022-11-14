import React from 'react';
import {
  HomeIcon,
  CalendarIcon,
  UsersIcon,
  Cog6ToothIcon,
  QuestionMarkCircleIcon,
} from '@heroicons/react/24/outline';

const Navbar = () => (
  <nav className="w-52 flex flex-col h-screen justify-between bg-white border-gray-200 px-2 sm:px-4 py-2.5 rounded dark:bg-gray-900 navbar">
    <div>
      <ul className="flex flex-col p-4 mt-4 bg-gray-50 rounded-lg border border-gray-100  md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
        <li className="flex items-center mb-8">
          <div className="h-5 w-5  ">
            <HomeIcon />
          </div>
          <p className="pl-2  text-base text fern">Home</p>
        </li>
        <li className="flex items-center mb-8">
          <div className="h-5 w-5  ">
            <CalendarIcon />
          </div>
          <p className="pl-2  text-base">Events</p>
        </li>
        <li className="flex items-center mb-8">
          <div className="h-5 w-5  ">
            <UsersIcon />
          </div>
          <p className="pl-2  text-base">Social Events</p>
        </li>
      </ul>
    </div>

    <div>
      <ul className="flex flex-col p-4 mt-4 bg-gray-50 rounded-lg border border-gray-100  md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
        <li className="flex items-center mb-8">
          <div className="h-5 w-5  ">
            <Cog6ToothIcon />
          </div>
          <p className="pl-2  text-base">Settings</p>
        </li>
        <li className="flex items-center ">
          <div className="h-5 w-5  ">
            <QuestionMarkCircleIcon />
          </div>
          <p className="pl-2  text-base">Help</p>
        </li>
      </ul>
    </div>
  </nav>
);

export default Navbar;

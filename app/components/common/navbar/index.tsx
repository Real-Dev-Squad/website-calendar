import React, { useState } from 'react';
import {
  HomeIcon,
  CalendarIcon,
  UsersIcon,
  Cog6ToothIcon,
  QuestionMarkCircleIcon,
} from '@heroicons/react/24/outline';

const Navbar = () => {
  const [active, setActive] = useState<number>(0);

  const myColor = (elementPosition: number) => {
    if (active === elementPosition) return true;
    return false;
  };
  const toggle = (elementPosition: number) => {
    if (active !== elementPosition) setActive(elementPosition);
  };
  return (
    <nav className="w-52 flex flex-col h-screen justify-between  px-2 sm:px-4 py-2.5 border-solid border-2 border-stone-200 bg-stone-50">
      <div>
        <ul className="flex flex-col p-2 mt-4 md:mt-0 md:text-sm md:font-medium bg-stone-50">
          <li className="flex items-center mb-8 cursor-pointer group" onClick={() => toggle(0)}>
            <div className="h-5 w-5">
              <HomeIcon
                className={`${
                  myColor(0) ? ' stroke-slate-900' : ' stroke-stone-500'
                } group-hover:stroke-slate-900`}
              />
            </div>
            <p
              className={`pl-2  text-base  hover:text-slate-900 ${
                myColor(0) ? ' text-slate-900' : ' text-stone-500'
              }`}
            >
              Home
            </p>
          </li>
          <li className="flex items-center mb-8 cursor-pointer  group" onClick={() => toggle(1)}>
            <div className="h-5 w-5 group-hover:stroke-slate-900 ">
              <CalendarIcon
                className={`${
                  myColor(1) ? ' stroke-slate-900' : ' stroke-stone-500'
                }  group-hover:stroke-slate-900`}
              />
            </div>
            <p
              className={`pl-2 text-base hover:text-slate-900 ${
                myColor(1) ? ' text-slate-900' : ' text-stone-500'
              }`}
            >
              Events
            </p>
          </li>
          <li className="flex items-center mb-8 cursor-pointer  group" onClick={() => toggle(2)}>
            <div className="h-5 w-5 group-hover:stroke-slate-900 ">
              <UsersIcon
                className={`${
                  myColor(2) ? ' stroke-slate-900' : ' stroke-stone-500'
                }  group-hover:stroke-slate-900`}
              />
            </div>
            <p
              className={`pl-2 text-base hover:text-slate-900 ${
                myColor(2) ? ' text-slate-900' : ' text-stone-500'
              }`}
            >
              Social Events
            </p>
          </li>
        </ul>
      </div>

      <div>
        <ul className="flex flex-col p-2 mt-4 md:mt-0 md:text-sm md:font-medium md:border-0 bg-stone-50">
          <li className="flex items-center mb-8 cursor-pointer group" onClick={() => toggle(3)}>
            <div className="h-5 w-5  group">
              <Cog6ToothIcon
                className={`${
                  myColor(3) ? ' stroke-slate-900' : ' stroke-stone-500'
                }  group-hover:stroke-slate-900`}
              />
            </div>
            <p
              className={`pl-2 text-base hover:text-slate-900 ${
                myColor(3) ? ' text-slate-900' : ' text-stone-500'
              }`}
            >
              Settings
            </p>
          </li>
          <li className="flex items-center cursor-pointer  group" onClick={() => toggle(4)}>
            <div className="h-5 w-5">
              <QuestionMarkCircleIcon
                className={`${
                  myColor(4) ? ' stroke-slate-900' : ' stroke-stone-500'
                } group-hover:stroke-slate-900`}
              />
            </div>
            <p className="pl-2 text-base text-stone-500 hover:stroke-slate-900">Help</p>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;

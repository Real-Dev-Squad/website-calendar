import React, { useState } from 'react';
import * as Icons from '@heroicons/react/24/outline';

interface DynamicHeroIconType {
  name: string;
  className: string;
}
interface NavItemType {
  icon: string;
  text: string;
  href: string;
  id: number;
  visibleOnDesktop: boolean;
}

const DynamicHeroIcon = ({ name, className }: DynamicHeroIconType) => {
  const IconComponent = Icons[`${name}Icon` as keyof typeof Icons];

  if (!IconComponent) {
    // Return a default one
    return <Icons.ArrowPathIcon />;
  }

  return <IconComponent className={className} />;
};

const Navbar = () => {
  const [active, setActive] = useState<number>(0);

  const myColor = (elementPosition: number) => {
    if (active === elementPosition) return true;
    return false;
  };
  const toggle = (elementPosition: number) => {
    if (active !== elementPosition) setActive(elementPosition);
  };

  const navbarElements = {
    arr1: [
      {
        icon: 'Home',
        text: 'Home',
        href: '/',
        id: 0,
        visibleOnDesktop: true,
      },
      {
        icon: 'Calendar',
        text: 'Events',
        href: '/',
        id: 1,
        visibleOnDesktop: true,
      },
      {
        icon: 'Users',
        text: 'Social Events',
        href: '/',
        id: 2,
        visibleOnDesktop: true,
      },
      {
        icon: 'Cog6Tooth',
        text: 'Settings',
        href: '/',
        id: 3,
        visibleOnDesktop: false,
      },
    ],
    arr2: [
      {
        icon: 'Cog6Tooth',
        text: 'Settings',
        href: '/',
        id: 3,
        visibleOnDesktop: true,
      },
      {
        icon: 'QuestionMarkCircle',
        text: 'Help',
        href: '/',
        id: 4,
        visibleOnDesktop: true,
      },
    ],
  };

  return (
    <nav className="w-full md:w-52 flex flex-row md:flex-col h-auto md:h-screen justify-between  px-0 md:px-2 sm:px-4 py-2.5 border-solid border-2 border-stone-200 bg-stone-50 fixed bottom-0 md:static">
      <div className="basis-full">
        <ul className="flex flex-row md:flex-col  justify-evenly px-0 md:px-2  mt-0 md:mt-4 md:text-sm md:font-medium bg-stone-50">
          {navbarElements.arr1.map((navIntem: NavItemType) => (
            <li
              className={`${
                navIntem.visibleOnDesktop ? '' : 'md:hidden'
              } flex flex-col md:flex-row items-center mb-0 md:mb-8 cursor-pointer group`}
              onClick={() => toggle(navIntem.id)}
            >
              <div className="h-5 w-5">
                <DynamicHeroIcon
                  name={navIntem.icon}
                  className={`${
                    myColor(navIntem.id) ? ' stroke-slate-900' : ' stroke-stone-500'
                  } group-hover:stroke-slate-900`}
                />
              </div>
              <p
                className={`p-0 md:p-0 md:pl-2   text-xs md:text-base   hover:text-slate-900 ${
                  myColor(navIntem.id) ? ' text-slate-900' : ' text-stone-500'
                }`}
              >
                {navIntem.text}
              </p>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <ul className="hidden md:flex flex-col p-2 mt-4 md:mt-0 md:text-sm md:font-medium md:border-0 bg-stone-50">
          {navbarElements.arr2.map((navIntem: NavItemType) => (
            <li
              className={`${
                navIntem.visibleOnDesktop ? '' : 'md:hidden'
              } flex flex-col md:flex-row items-center mb-0 md:mb-8 cursor-pointer group`}
              onClick={() => toggle(navIntem.id)}
            >
              <div className="h-5 w-5">
                <DynamicHeroIcon
                  name={navIntem.icon}
                  className={`${
                    myColor(navIntem.id) ? ' stroke-slate-900' : ' stroke-stone-500'
                  } group-hover:stroke-slate-900`}
                />
              </div>
              <p
                className={`p-0 md:p-0 md:pl-2   text-xs md:text-base   hover:text-slate-900 ${
                  myColor(navIntem.id) ? ' text-slate-900' : ' text-stone-500'
                }`}
              >
                {navIntem.text}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;

import React, { useState } from 'react';
import * as Icons from '@heroicons/react/24/outline';
import Slider from '../slider';

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

export const DynamicHeroIcon = ({ name, className }: DynamicHeroIconType) => {
  const IconComponent = Icons[`${name}Icon` as keyof typeof Icons];

  if (!IconComponent) {
    // Return a default one
    return <Icons.ArrowPathIcon />;
  }

  return <IconComponent className={className} />;
};

const Navbar = () => {
  const [active, setActive] = useState<number>(0);
  const [showSlider, setShowSlider] = useState<boolean>(false);

  const myColor = (elementPosition: number) => {
    if (active === elementPosition) return true;
    return false;
  };
  const toggle = (elementPosition: number) => {
    if (active !== elementPosition) setActive(elementPosition);
  };

  const navbarElements = {
    navbarPages: [
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
    navbarSettings: [
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

  const classShortHands = {
    flexDesktopCol: 'flex flex-row md:flex-col',
    flexDesktopRow: 'flex flex-col md:flex-row',
    fontSize: 'text-xs md:text-base',
    padding: 'px-0 md:px-2',
    headingSelectedColor: 'text-slate-900',
    headingColor: 'text-stone-500',
    navbarBackgroundColor: 'bg-stone-50',
  };

  return (
    <nav
      className={`w-full md:w-52 ${classShortHands.flexDesktopCol} md:h-screen justify-between  ${classShortHands.padding} sm:px-4 border-t-2  md:border-r-2  border-stone-200 ${classShortHands.navbarBackgroundColor} fixed bottom-0 md:static z-10`}
    >
      <Slider isOpen={showSlider} toggle={setShowSlider} />

      <div className="basis-full">
        <ul
          className={`${classShortHands.flexDesktopCol} justify-evenly ${classShortHands.padding} py-2  mt-0 md:mt-7 md:text-sm md:font-medium ${classShortHands.navbarBackgroundColor}`}
        >
          {navbarElements.navbarPages.map((navIntem: NavItemType) => (
            <li
              key={navIntem.id}
              className={`${navIntem.visibleOnDesktop ? '' : 'md:hidden'} ${
                classShortHands.flexDesktopRow
              } items-center mb-0 md:mb-8 cursor-pointer group`}
              onClick={() => toggle(navIntem.id)}
            >
              <div className="h-5 w-5">
                <DynamicHeroIcon
                  name={navIntem.icon}
                  className={`${
                    myColor(navIntem.id)
                      ? `${classShortHands.headingSelectedColor}`
                      : `${classShortHands.headingColor}`
                  } group-hover:${classShortHands.headingSelectedColor}`}
                />
              </div>
              <p
                className={`p-0 md:p-0 md:pl-2   ${classShortHands.fontSize}  hover:${
                  classShortHands.headingSelectedColor
                } ${
                  myColor(navIntem.id)
                    ? `${classShortHands.headingSelectedColor}`
                    : `${classShortHands.headingColor}`
                }`}
              >
                {navIntem.text}
              </p>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <ul
          className={`hidden md:flex flex-col ${classShortHands.padding} mt-4 md:mt-0 md:text-sm md:font-medium md:border-0 ${classShortHands.navbarBackgroundColor}`}
        >
          {navbarElements.navbarSettings.map((navIntem: NavItemType) => (
            <li
              key={navIntem.id}
              className={`${navIntem.visibleOnDesktop ? '' : 'md:hidden'}  ${
                classShortHands.flexDesktopRow
              } items-center mb-0 md:mb-8 cursor-pointer group`}
              onClick={() => toggle(navIntem.id)}
            >
              <div className="h-5 w-5">
                <DynamicHeroIcon
                  name={navIntem.icon}
                  className={`${
                    myColor(navIntem.id)
                      ? `$${classShortHands.headingSelectedColor}`
                      : `${classShortHands.headingColor}`
                  } group-hover:stroke-slate-900`}
                />
              </div>
              <p
                className={`p-0 md:pl-2   ${classShortHands.fontSize}   hover:${
                  classShortHands.headingSelectedColor
                } ${
                  myColor(navIntem.id)
                    ? `${classShortHands.headingSelectedColor}`
                    : `${classShortHands.headingColor}`
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

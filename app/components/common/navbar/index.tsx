import React, { useEffect, useState } from 'react';
import * as Icons from '@heroicons/react/24/outline';
import { Link, useMatches } from '@remix-run/react';
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
  const matches = useMatches();
  const {pathname} = matches[matches.length - 1];
  const [active, setActive] = useState<string>('');
  const [showSlider, setShowSlider] = useState<boolean>(false);

  const myColor = (elementPath: string) => {
    if (active === elementPath) return true;
    return false;
  };
  const toggle = (elementPath: string) => {
    if (active !== elementPath) setActive(elementPath);
  };

  useEffect(() => {
    setActive(pathname)
  },[pathname]);

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
        href: '/events',
        id: 1,
        visibleOnDesktop: true,
      },
      {
        icon: 'Users',
        text: 'Social Events',
        href: '/socialEvents',
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
          {navbarElements.navbarPages.map((navItem: NavItemType) => (
            <Link to={navItem.href} key={navItem.id}>
              <li
                key={navItem.id}
                className={`${navItem.visibleOnDesktop ? '' : 'md:hidden'} ${
                  classShortHands.flexDesktopRow
                } items-center mb-0 md:mb-8 cursor-pointer group`}
                onClick={() => toggle(navItem.href)}
              >
                <div className="h-5 w-5">
                  <DynamicHeroIcon
                    name={navItem.icon}
                    className={`${
                      myColor(navItem.href)
                        ? `${classShortHands.headingSelectedColor}`
                        : `${classShortHands.headingColor}`
                    } group-hover:${classShortHands.headingSelectedColor}`}
                  />
                </div>
                <p
                  className={`p-0 md:p-0 md:pl-2   ${classShortHands.fontSize}  hover:${
                    classShortHands.headingSelectedColor
                  } ${
                    myColor(navItem.href)
                      ? `${classShortHands.headingSelectedColor}`
                      : `${classShortHands.headingColor}`
                  }`}
                >
                  {navItem.text}
                </p>
              </li>
            </Link>
          ))}
        </ul>
      </div>

      <div>
        <ul
          className={`hidden md:flex flex-col ${classShortHands.padding} mt-4 md:mt-0 md:text-sm md:font-medium md:border-0 ${classShortHands.navbarBackgroundColor}`}
        >
          {navbarElements.navbarSettings.map((navItem: NavItemType) => (
            <Link to={navItem.href} key={navItem.id}>
              <li
                key={navItem.id}
                className={`${navItem.visibleOnDesktop ? '' : 'md:hidden'}  ${
                  classShortHands.flexDesktopRow
                } items-center mb-0 md:mb-8 cursor-pointer group`}
                onClick={() => toggle(navItem.href)}
              >
                <div className="h-5 w-5">
                  <DynamicHeroIcon
                    name={navItem.icon}
                    className={`${
                      myColor(navItem.href)
                        ? `$${classShortHands.headingSelectedColor}`
                        : `${classShortHands.headingColor}`
                    } group-hover:stroke-slate-900`}
                  />
                </div>
                <p
                  className={`p-0 md:pl-2   ${classShortHands.fontSize}   hover:${
                    classShortHands.headingSelectedColor
                  } ${
                    myColor(navItem.href)
                      ? `${classShortHands.headingSelectedColor}`
                      : `${classShortHands.headingColor}`
                  }`}
                >
                  {navItem.text}
                </p>
              </li>
            </Link>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;

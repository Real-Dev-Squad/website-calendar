import React, { useState, useEffect, useRef } from 'react';
import {
  HomeIcon,
  CalendarIcon,
  UsersIcon,
  Cog6ToothIcon,
  QuestionMarkCircleIcon,
} from '@heroicons/react/24/outline';

const Navbar = () => {
  const [active, setActive] = useState<number>(0);
  const [expand, setExpand] = useState<boolean>(false);
  const navbarRef = useRef<any>(null);

  const myColor = (elementPosition: number) => {
    if (active === elementPosition) return true;
    return false;
  };
  const toggle = (elementPosition: number) => {
    if (active !== elementPosition) setActive(elementPosition);
  };
  useEffect(() => {
    const observer = new window.ResizeObserver((entries) => {
      const navbarElementWidth = entries[0].borderBoxSize[0].inlineSize;
      const navbarElementHeight = entries[0].borderBoxSize[0].blockSize;

      if (navbarElementHeight <= 110 && navbarElementWidth < 768) {
        if (!expand) {
          if (!expand) setExpand(false);
        }
      }
    });
    observer.observe(navbarRef.current);
  }, []);
  return (
    <nav
      ref={navbarRef}
      className={`w-full ${
        expand ? 'md:w-52' : 'md:w-12'
      }  flex flex-row md:flex-col h-auto md:h-screen  justify-between  ${
        expand ? 'px-0' : 'px-2'
      } py-2.5 border-solid border-2 border-stone-200 bg-stone-50 transition-all duration-500 fixed bottom-0 md:static`}
    >
      <div className="basis-full md:basis-3/12">
        <ul
          className={`flex flex-row md:flex-col justify-evenly  ${
            expand ? 'px-4 py-2' : 'p-0'
          }  mt-0  md:text-sm md:font-medium bg-stone-50`}
        >
          <li
            className={`flex flex-col md:flex-row items-center ${
              expand ? '' : 'justify-center'
            }  mb-0 md:mb-8 cursor-pointer group`}
            onClick={() => toggle(0)}
          >
            <div className="h-5 w-5">
              <HomeIcon
                className={`${
                  myColor(0) ? ' stroke-slate-900' : ' stroke-stone-500'
                } group-hover:stroke-slate-900`}
              />
            </div>
            <p
              className={`block md:hidden text-xs  md:text-base  hover:text-slate-900 ${
                myColor(0) ? ' text-slate-900' : ' text-stone-500 '
              }`}
            >
              Home
            </p>
            {expand && (
              <p
                className={`pl-2  text-base  hover:text-slate-900 ${
                  myColor(0) ? ' text-slate-900' : ' text-stone-500 '
                }`}
              >
                Home
              </p>
            )}
          </li>
          <li
            className={`flex flex-col md:flex-row items-center ${
              expand ? '' : 'justify-center'
            } mb-0 md:mb-8 cursor-pointer  group`}
            onClick={() => toggle(1)}
          >
            <div className="h-5 w-5 group-hover:stroke-slate-900 ">
              <CalendarIcon
                className={`${
                  myColor(1) ? ' stroke-slate-900' : ' stroke-stone-500'
                }  group-hover:stroke-slate-900`}
              />
            </div>
            <p
              className={`block md:hidden text-xs  md:text-base  hover:text-slate-900 ${
                myColor(0) ? ' text-slate-900' : ' text-stone-500 '
              }`}
            >
              Events
            </p>
            {expand && (
              <p
                className={`pl-2 text-base hover:text-slate-900 ${
                  myColor(1) ? ' text-slate-900' : ' text-stone-500'
                }`}
              >
                Events
              </p>
            )}
          </li>
          <li
            className={`flex flex-col md:flex-row items-center ${
              expand ? '' : 'justify-center'
            } mb-0 md:mb-8 cursor-pointer  group`}
            onClick={() => toggle(2)}
          >
            <div className="h-5 w-5 group-hover:stroke-slate-900 ">
              <UsersIcon
                className={`${
                  myColor(2) ? ' stroke-slate-900' : ' stroke-stone-500'
                }  group-hover:stroke-slate-900`}
              />
            </div>
            <p
              className={`block md:hidden text-xs  md:text-base  hover:text-slate-900 ${
                myColor(0) ? ' text-slate-900' : ' text-stone-500 '
              }`}
            >
              Events
            </p>
            {expand && (
              <p
                className={`pl-2 text-base hover:text-slate-900 ${
                  myColor(2) ? ' text-slate-900' : ' text-stone-500'
                }`}
              >
                Social Events
              </p>
            )}
          </li>
          <li
            className={`flex flex-col md:flex-row md:hidden  items-center ${
              expand ? '' : 'justify-center'
            }  mb-0 md:mb-8 cursor-pointer group`}
            onClick={() => toggle(3)}
          >
            <div className="h-5 w-5  group">
              <Cog6ToothIcon
                className={`${
                  myColor(3) ? ' stroke-slate-900' : ' stroke-stone-500'
                }  group-hover:stroke-slate-900`}
              />
            </div>

            <p
              className={` text-xs hover:text-slate-900 ${
                myColor(3) ? ' text-slate-900' : ' text-stone-500'
              }`}
            >
              Settings
            </p>
          </li>
        </ul>
      </div>
      <div
        className="md:basis-6/12"
        onClick={() => {
          setExpand((prev) => !prev);
        }}
      ></div>
      <div className="hidden md:block md:basis-2/12">
        <ul
          className={`hidden md:flex flex-row md:flex-col ${
            expand ? 'px-4 py-2' : 'p-0'
          } mt-4 md:mt-0 md:text-sm md:font-medium md:border-0 bg-stone-50`}
        >
          <li
            className={`flex items-center ${
              expand ? '' : 'justify-center'
            }  mb-0 md:mb-8 cursor-pointer group`}
            onClick={() => toggle(3)}
          >
            <div className="h-5 w-5  group">
              <Cog6ToothIcon
                className={`${
                  myColor(3) ? ' stroke-slate-900' : ' stroke-stone-500'
                }  group-hover:stroke-slate-900`}
              />
            </div>
            {expand && (
              <p
                className={`pl-2 text-base hover:text-slate-900 ${
                  myColor(3) ? ' text-slate-900' : ' text-stone-500'
                }`}
              >
                Settings
              </p>
            )}
          </li>
          <li
            className={`flex items-center ${
              expand ? '' : 'justify-center'
            } mb-0 md:mb-8  cursor-pointer  group`}
            onClick={() => toggle(4)}
          >
            <div className="h-5 w-5">
              <QuestionMarkCircleIcon
                className={`${
                  myColor(4) ? ' stroke-slate-900' : ' stroke-stone-500'
                } group-hover:stroke-slate-900`}
              />
            </div>
            {expand && (
              <p
                className={`pl-2 text-base hover:text-slate-900 ${
                  myColor(4) ? ' text-slate-900' : ' text-stone-500'
                }`}
              >
                Help
              </p>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;

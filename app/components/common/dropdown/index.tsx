import React, { useState, Dispatch, SetStateAction } from 'react';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';

interface UserFormInterface {
  username: string;
  firstname: string;
  lastname: string;
  timezone: string;
}
interface DropdownProps {
  placeholder: string;
  setUserTimezone: Dispatch<SetStateAction<UserFormInterface>>;
}

const Dropdown: React.FC<DropdownProps> = ({ placeholder, setUserTimezone }) => {
  const [dropdownValue, setDropdownValue] = useState<string>('');
  const [dropdownStatus, setDropdownStatus] = useState<boolean>(false);

  const timezoneArray = [
    {
      title: '(GMT+05:30) Chennai, Kolkata, Mumbai, New Delhi',
      timezone: 'India Standard Time',
      id: 0,
    },
    {
      title: '(GMT+06:00) Astana, Dhaka',
      timezone: 'Central Asia Standard Time',
      id: 1,
    },
    {
      title: '(GMT+07:00) Bangkok, Hanoi, Jakarta',
      timezone: 'S.E. Asia Standard Time',
      id: 2,
    },
    {
      title: '(GMT+08:00) Irkutsk, Ulaanbaatar',
      timezone: 'North Asia East Standard Time',
      id: 3,
    },
  ];

  const setDropdown = (e: React.MouseEvent<Element, MouseEvent>) => {
    const element = e.target as HTMLElement;
    setUserTimezone((prev) => ({ ...prev, timezone: element.innerText }));
    setDropdownValue(element.innerText);
    setDropdownStatus(false);
  };
  return (
    <main data-testid="dropdown">
      <div
        data-testid="dropdown-controller"
        className={`w-full flex items-center justify-between border border-stone-400 solid py-3 px-3 ${
          dropdownStatus ? 'rounded-b-none rounded-t-lg' : 'rounded-lg'
        } cursor-pointer `}
        onClick={() => setDropdownStatus((prev: boolean) => !prev)}
      >
        <button
          data-testid="dropdown-value"
          value={dropdownValue || placeholder}
          className={`${dropdownValue ? 'text-gray-700 ' : 'text-slate-400'}  text-sm`}
        >
          {dropdownValue || placeholder}
        </button>

        <span className="h-5 w-5">{dropdownStatus ? <ChevronUpIcon /> : <ChevronDownIcon />}</span>
      </div>
      <div>
        <ul
          data-testid="option-list"
          className={`${
            dropdownStatus ? '' : 'hidden'
          } mb-2 border border-t-0 rounded-t-none  rounded-b-lg h-32 border-stone-400 overflow-y-auto text-sm text-gray-700 dark:text-gray-200`}
          onClick={(e) => setDropdown(e)}
        >
          {timezoneArray.map((item, index) => (
            <li
              data-value={item.title}
              key={item.id}
              data-testid={`option-${index + 1}`}
              className="flex p-3 rounded hover:bg-gray-100 dark:hover:bg-gray-600"
            >
              <label htmlFor={`checkbox-${index + 1}`}>{item.title}</label>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
};

export default Dropdown;

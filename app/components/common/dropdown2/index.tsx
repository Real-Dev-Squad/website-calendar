import React from 'react';

const DropdownTwo = () => {
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

  return (
    <main>
      <select
        name="timezones"
        id="timezone-select"
        className="w-full flex items-center justify-between border relative border-stone-400 solid py-3 px-3 rounded-b-none rounded-t-lg"
        onClick={(e) => console.log(e)}
      >
        <option data-testid="option-0" value="">
          Select a timezone
        </option>
        {timezoneArray?.map((item, index) => (
          <option data-testid={`option-${index + 1}`} value={item.title} key={item.id}>
            {item.title}
          </option>
        ))}
      </select>
    </main>
  );
};

export default DropdownTwo;

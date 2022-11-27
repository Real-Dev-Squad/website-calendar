import { useState } from 'react';
import UserCalendarDetails from './UserCalendarDetails';
import UserDetails from './UserDetails';
import { Button } from '../Button';

const UserOnboarding = () => {
  const [page, setPage] = useState<number>(0);
  const FormTitlesAndSubtitles = [
    {
      title: 'Welcome to HapDay',
      subtitle:
        'Tell us a bit about yourself, we will need this to get your profile setup. You’ll be able to edit this later.',
    },
    {
      title: 'Connect your calendar',
      subtitle:
        'Connect your calendar to automatically check for busy times and new events as they’re scheduled.',
    },
  ];

  const PageDisplay = () => {
    if (page === 0) {
      return <UserDetails />;
    }
    if (page === 1) {
      return <UserCalendarDetails />;
    }
    return 'done';
  };

  return (
    <div className="form bg-stone-50 h-screen">
      <div className="form-container h-full flex flex-col justify-between">
        <div>
          <div className="header">
            <h1 className="text-2x font-semibold text-center pt-10 mb-3">
              {FormTitlesAndSubtitles[page].title}
            </h1>
            <p className="text-sm text-center mx-12 text-slate-900">
              {FormTitlesAndSubtitles[page].subtitle}
            </p>
          </div>
          <div className="progressbar my-4">
            <p className="text-xs text-stone-500 mx-4 mb-1">Step 1 of 2</p>
            <div className="flex mx-4">
              {FormTitlesAndSubtitles.map((item, index) => (
                <div
                  key={index}
                  className={`h-2 transition-all ease-in-out duration-300 ${
                    page === index ? 'basis-4/6' : 'basis-2/6'
                  } ${page === index ? 'bg-stone-900' : 'bg-stone-300'}  rounded mr-1`}
                ></div>
              ))}
            </div>
          </div>
          <div className="body">{PageDisplay()}</div>
        </div>
        <div className=" mx-4 mb-3">
          <Button
            label="Save & Next"
            width="w-full"
            size="medium"
            varient="primary"
            handleClick={() => setPage((currentPage: number) => currentPage + 1)}
          />
        </div>
      </div>
    </div>
  );
};

export default UserOnboarding;

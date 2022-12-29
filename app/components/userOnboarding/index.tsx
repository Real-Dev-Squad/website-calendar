import { FC, useState } from 'react';
import UserCalendarDetails from './UserCalendarDetails';
import UserDetails from './UserDetails';
import { Button } from '../Button';

interface UserOnboardingInterface {
  apiHost: string;
  authToken: string;
}

const UserOnboarding: FC<UserOnboardingInterface> = ({ apiHost, authToken }) => {
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
      return <UserDetails apiHost={apiHost} authToken={authToken} />;
    }
    if (page === 1) {
      return <UserCalendarDetails />;
    }
    return '';
  };

  return (
    <div className="form bg-stone-50 h-screen">
      <div className="form-container h-full flex flex-col justify-between">
        <div className="header-pbar-wrapper basis-3/12">
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
        </div>
        <div className="body basis-7/12">{PageDisplay()}</div>
        <div className=" mx-4 mb-3 basis-1/12">
          <Button
            label="Save & Next"
            size="medium"
            varient="primary"
            disabled={page === FormTitlesAndSubtitles.length - 1}
            handleClick={() => setPage((currentPage: number) => currentPage + 1)}
          />
        </div>
      </div>
    </div>
  );
};

export default UserOnboarding;

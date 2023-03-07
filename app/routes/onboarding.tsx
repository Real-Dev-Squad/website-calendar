import { FC, useEffect, useState } from 'react';
import { useLoaderData, Outlet, useLocation } from '@remix-run/react';
import { json, LoaderFunction } from '@remix-run/node';
import { FormTitlesAndSubtitles } from '~/constants/userOnboarding';

interface UserOnboardingInterface {
  apiHost: string;
}
type LoaderData = {
  apiHost: string;
};

export const loader: LoaderFunction = async () => json({ apiHost: process.env.API_HOST });

const OnboardingPage: FC<UserOnboardingInterface> = () => {
  const [page, setPage] = useState<number>(0);
  const { apiHost } = useLoaderData<LoaderData>();

  const location = useLocation();

  const pageDisplay = (pathName: string) => {
    const path = pathName.split('/')[2];

    if (path === 'userDetails') {
      setPage(0);
    }
    if (path === 'userCalendarDetails') {
      setPage(1);
    }
  };

  useEffect(() => {
    if (location.pathname) pageDisplay(location.pathname);
  }, [location.pathname]);

  return (
    <main className="max-w-md flex mx-auto">
      {apiHost && (
        <div className="form bg-stone-50 h-screen">
          <div className="form-container h-full flex flex-col ">
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
                <p className="text-xs text-stone-500 mx-4 mb-1">Step {page + 1} of 2</p>
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

            <Outlet />
          </div>
        </div>
      )}
    </main>
  );
};

export default OnboardingPage;

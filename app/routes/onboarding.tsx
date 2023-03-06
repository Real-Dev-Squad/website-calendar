import { FC, useEffect, useState } from 'react';
import { useLoaderData, useActionData, Outlet, useLocation } from '@remix-run/react';
import { json, redirect, ActionFunction, LoaderFunction } from '@remix-run/node';
import axios from 'axios';

interface UserOnboardingInterface {
  apiHost: string;
}
type LoaderData = {
  apiHost: string;
};

export const loader: LoaderFunction = async () => json({ apiHost: process.env.API_HOST });

export const action: ActionFunction = async ({ request }) => {
  const formData = Object.fromEntries(await request.formData());

  const url = `${process.env.API_HOST}/api/v1/users/self`;
  const { username, firstname, lastname, timezone } = formData;

  const errors = {
    username: username ? null : 'Username is required',
    firstname: firstname ? null : 'firstname is required',
    lastname: lastname ? null : 'lastname is required',
    timezone: timezone ? null : 'Timezone is required',
  };

  const hasErrors = Object.values(errors).some((errorMessage) => errorMessage);
  if (hasErrors) {
    return json(errors);
  }

  try {
    const cookieHeader = request.headers.get('Cookie');
    await axios.patch(url, formData, {
      headers: {
        Cookie: cookieHeader,
        'Content-Type': 'application/json',
      },
    });
    // if (response) return response;
    return { page: 1 };
  } catch (error) {
    return error;
  }
};

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

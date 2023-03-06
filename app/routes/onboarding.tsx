import { FC, useEffect, useState } from 'react';
import { useLoaderData, useActionData, Outlet } from '@remix-run/react';
import { json, redirect, ActionFunction, LoaderFunction } from '@remix-run/node';
import axios from 'axios';

interface UserOnboardingInterface {
  apiHost: string;
}

export const loader: LoaderFunction = async () => json({ apiHost: process.env.API_HOST });

type LoaderData = {
  apiHost: string;
};

export const action: ActionFunction = async ({ request, params }) => {
  const formData = Object.fromEntries(await request.formData());
  //   console.log('fullname:', formData);
  const url = `${process.env.API_HOST}/api/v1/users/self`;
  const { username, firstname, lastname, timezone } = formData;
  //   const firstname = (fullname as string).split(' ')[0];
  //   const lastname = (fullname as string).split(' ')[1];
  console.log(formData);

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
    console.log('REQUEST:', request.headers.get('Cookie'));
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
    console.log(error);
    return null;
  }
};

const OnboardingPage: FC<UserOnboardingInterface> = () => {
  const [page, setPage] = useState<number>(0);
  const { apiHost } = useLoaderData<LoaderData>();
  const data = useActionData();

  useEffect(() => {
    if (data?.page) setPage(data.page);
  }, [data?.page]);

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

  //   const PageDisplay = () => {
  //     if (page === 0) {
  //       return (
  //         <UserDetails
  //           apiHost={apiHost}
  //           authToken={authToken}
  //           page={page}
  //           formTitlesAndSubtitles={FormTitlesAndSubtitles}
  //         />
  //       );
  //     }
  //     if (page === 1) {
  //       return <UserCalendarDetails />;
  //     }
  //     return '';
  //   };

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

import { FC } from 'react';
import { ActionArgs, json, redirect } from '@remix-run/node';
import register from '~/api/onboarding/register.server';
import FormTitlesAndSubtitles from '~/constants/userOnboarding';
import ContentPill from '~/components/common/contentPill';
import { GoogleCalendar, MicrosoftCalendar } from '~/components/icons';

export async function action({ request }: ActionArgs) {
  const formData = await request.formData();
  const username = formData.get('username');
  const fullName = formData.get('fullName');
  const userData = {
    username,
    firstname: fullName,
    timezone: 'Asia/India',
  };
  const response = await register(userData);
  if (response.username) {
    return redirect(`/onboardingUser/register?username=${response.username}`);
  }
  return null;
}

const ConnectCalendar: FC = () => {
  return (
    <main className="max-w-md flex mx-auto">
      <div className="form bg-stone-50 h-screen">
        <div className="form-container h-full flex flex-col justify-between">
          <div className="header-pbar-wrapper basis-3/12">
            <div className="header">
              <h1 className="text-2x font-semibold text-center pt-10 mb-3">
                {FormTitlesAndSubtitles[1].title}
              </h1>
              <p className="text-sm text-center mx-12 text-slate-900">
                {FormTitlesAndSubtitles[1].subtitle}
              </p>
            </div>
            <div className="progressbar my-4">
              <p className="text-xs text-stone-500 mx-4 mb-1">Step 1 of 2</p>
              <div className="flex mx-4">
                {FormTitlesAndSubtitles.map((item, index) => (
                  <div
                    key={index}
                    className={`h-2 transition-all ease-in-out duration-300 ${
                      1 === index ? 'basis-4/6' : 'basis-2/6'
                    } ${1 === index ? 'bg-stone-900' : 'bg-stone-300'}  rounded mr-1`}
                  ></div>
                ))}
              </div>
            </div>
          </div>
          <div className="body basis-7/12">
            <div className="h-full flex flex-col justify-between">
              <div className="relative">
                <ContentPill
                  title="Microsoft Calendar"
                  btnHeading="Connect"
                  svg={<MicrosoftCalendar />}
                />
                <ContentPill
                  title="Google Calendar"
                  btnHeading="Connect"
                  svg={<GoogleCalendar />}
                />
              </div>
              <div className="flex justify-center">
                <button className="text-sm pb-3">I&apos;ll connect my calendar later</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ConnectCalendar;

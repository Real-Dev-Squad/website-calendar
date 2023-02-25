import { FC, useEffect, useMemo, useState } from 'react';
import debounce from 'lodash.debounce';
import { Form, useActionData, useLoaderData } from '@remix-run/react';
import { ActionArgs, json, redirect } from '@remix-run/node';
import UserInput from '~/components/common/userInput';
import register from '~/api/onboarding/register.server';
import Dropdown from '~/components/common/dropdown';
import { isUsernameAvailable } from '~/api/onboarding/username.client';
import FormTitlesAndSubtitles from '~/constants/userOnboarding';

interface UserFormInterface {
  username: string;
  fullName: string;
}

interface UserDetailsInterface {
  apiHost: string;
  authToken: string;
}

export async function loader() {
  return json({ apiHost: process.env.API_HOST, authToken: process.env.AUTH_TOKEN });
}

export async function action({ request }: ActionArgs) {
  const formData = await request.formData();
  const username = formData.get('username');
  const fullName = formData.get('fullName');
  if (username && fullName) {
    const userData = {
      username,
      firstname: fullName,
      timezone: 'Asia/India',
    };
    if (userData) {
      const response = await register(userData);
      if (response.username) {
        return redirect(`/onboardingUser/connect?username=${response.username}`);
      }
    }
  }

  return null;
}

const UserDetails: FC<UserDetailsInterface> = () => {
  const { apiHost, authToken } = useLoaderData<typeof loader>();
  const data = useActionData();
  const initialUserDetails = {
    username: '',
    fullName: '',
  };
  const [userForm, setUserForm] = useState<UserFormInterface>(initialUserDetails);
  const [usernameAvailable, setUsernameAvailable] = useState<boolean | undefined>();
  const [query, setQuery] = useState<string>('');

  useEffect(() => {
    (async () => {
      if (query !== '') {
        const res: boolean = await isUsernameAvailable(apiHost!, authToken!, query);
        setUsernameAvailable(res);
      }
    })();
  }, [query]);

  const checkUsernameAvailability = async () => {
    setUserForm((f) => {
      setQuery(f.username);
      return f;
    });
  };

  const debounceRequest = useMemo(() => debounce(checkUsernameAvailability, 400), []);

  const updateUsername = (username: string) => {
    setUserForm((user) => ({ ...user, username }));
    setUsernameAvailable(undefined);
    debounceRequest();
  };

  const updateFullName = (fullName: string) => {
    setUserForm((user) => ({ ...user, fullName }));
  };

  const usernameError = () => {
    if (usernameAvailable === undefined) {
      return null;
    }
    if (!usernameAvailable) {
      return 'Username is already taken';
    }
    return null;
  };

  return (
    <main className="max-w-md flex mx-auto">
      <div className="form bg-stone-50 h-screen">
        <div className="form-container h-full flex flex-col justify-between">
          <div className="header-pbar-wrapper basis-3/12">
            <div className="header">
              <h1 className="text-2x font-semibold text-center pt-10 mb-3">
                {FormTitlesAndSubtitles[0].title}
              </h1>
              <p className="text-sm text-center mx-12 text-slate-900">
                {FormTitlesAndSubtitles[0].subtitle}
              </p>
            </div>
            <div className="progressbar my-4">
              <p className="text-xs text-stone-500 mx-4 mb-1">Step 1 of 2</p>
              <div className="flex mx-4">
                {FormTitlesAndSubtitles.map((item, index) => (
                  <div
                    key={index}
                    className={`h-2 transition-all ease-in-out duration-300 ${
                      0 === index ? 'basis-4/6' : 'basis-2/6'
                    } ${0 === index ? 'bg-stone-900' : 'bg-stone-300'}  rounded mr-1`}
                  ></div>
                ))}
              </div>
            </div>
          </div>
          <div className="body basis-7/12">
            <Form className="mx-4" method="post" action="#">
              <div>
                <UserInput
                  label="Username"
                  placeholder="username here"
                  link="hap.day/"
                  value={userForm.username}
                  setValue={updateUsername}
                  err={usernameError()}
                  name="username"
                />
              </div>
              <div>
                <UserInput
                  label="Full name"
                  placeholder="Jane doe"
                  value={userForm.fullName}
                  setValue={updateFullName}
                  name="fullName"
                />
              </div>

              <Dropdown placeholder="select timezone" />

              <div className=" mx-4 mb-3 mt-3 basis-1/12">
                <button
                  type="submit"
                  className={`
                flex items-center justify-center border rounded-lg transition 
               w-full border-transparent bg-blue-600 text-white hover:bg-blue-800 px-4 py-2 gap-2                 
                }
            `}
                >
                  Save and Next
                </button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </main>
  );
};

export default UserDetails;

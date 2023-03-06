import React, { FC, useEffect, useMemo, useState } from 'react';
import { Form, useSubmit, useActionData } from '@remix-run/react';
import { ActionFunction, json, redirect, LoaderFunction } from '@remix-run/node';
import debounce from 'lodash.debounce';
import axios from 'axios';
import UserInput from '../../components/common/userInput';
import Dropdown from '../../components/common/dropdown';
import { Button } from '../../components/Button';

// import { isUsernameAvailable } from '~/models/username.server';

interface UserFormInterface {
  username: string;
  firstname: string;
  lastname: string;
  timezone: string;
}

interface UserDetailsInterface {
  apiHost: string;

  page: number;
  formTitlesAndSubtitles: Array<object>;
}

const isUsernameAvailable = async (host: string, username: string) => {
  const url = `${host}/api/v1/users/usernameCheck/${username}`;
  try {
    const response = await axios.get(url, {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    });
    return response.data.data.available;
  } catch (error) {
    console.error('err', error);
    return error;
  }
};

export const loader: LoaderFunction = async ({ request, params }) => {
  console.log('index', params);
  return null;
};

export const action: ActionFunction = async ({ request, params }) => {
  const formData = Object.fromEntries(await request.formData());

  const url = `${process.env.API_HOST}/api/v1/users/self`;
  const { username, firstname, lastname, timezone } = formData;

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
    const cookieHeader = request.headers.get('Cookie');
    await axios.patch(url, formData, {
      headers: {
        Cookie: cookieHeader,
        'Content-Type': 'application/json',
      },
    });
    // if (response) return response;
    return redirect('/onboarding/userCalendarDetails');
  } catch (error) {
    return error;
  }
};

const UserDetails: FC<UserDetailsInterface> = () => {
  const errors = useActionData();

  const initialUserDetails = {
    username: '',
    firstname: '',
    lastname: '',
    timezone: '',
  };
  const UserDetailErrors = {
    username: '',
    firstname: '',
    lastname: '',
    timezone: '',
  };

  const [userForm, setUserForm] = useState<UserFormInterface>(initialUserDetails);
  const [usernameAvailable, setUsernameAvailable] = useState<boolean | undefined>();
  const [query, setQuery] = useState<string>('');
  const [userErrors, setUserErrors] = useState(UserDetailErrors);

  const submit = useSubmit();

  useEffect(() => {
    (async () => {
      if (query !== '') {
        const res: boolean = await isUsernameAvailable(window.ENV.API_HOST, query);
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

  const updateFirstName = (firstname: string) => {
    setUserForm((user) => ({ ...user, firstname }));
  };
  const updateLastName = (lastname: string) => {
    setUserForm((user) => ({ ...user, lastname }));
  };

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    // let's prevent the default event
    event.preventDefault();

    // grab the form element
    const $form = event.currentTarget;

    // get the formData from that form
    const formData = new FormData($form);

    // save timezone
    formData.set('timezone', userForm.timezone);

    // and finally submit the form data, re-using the method and action from the form
    submit(formData, {
      method: 'patch',
      action: $form.getAttribute('action') ?? $form.action,
    });
  }

  const usernameError = () => {
    if (usernameAvailable === undefined) {
      return null;
    }
    if (!usernameAvailable) {
      return 'Username is already taken';
    }
    return null;
  };
  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name } = e.target;

    setUserErrors({ ...userErrors, [name]: '' });
  };
  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (value.trim() === '') {
      setUserErrors({ ...userErrors, [name]: `${name} is required` });
    }
  };

  return (
    <Form onSubmit={handleSubmit} method="patch" className=" h-full flex flex-col">
      <div className="basis-10/12">
        <div className="mx-4">
          <div>
            <UserInput
              label="Username"
              name="username"
              placeholder="username here"
              link="hap.day/"
              value={userForm.username}
              setValue={updateUsername}
              err={usernameError() || errors?.username || userErrors.username}
              handleBlur={handleBlur}
              handleFocus={handleFocus}
            />
          </div>

          <div className="flex justify-between ">
            <div className="basis-3/6 mx-1">
              <UserInput
                label="First name"
                name="firstname"
                placeholder="Jane"
                value={userForm.firstname}
                setValue={updateFirstName}
                err={errors?.firstname || userErrors.firstname}
                handleBlur={handleBlur}
                handleFocus={handleFocus}
              />
            </div>
            <div className="basis-3/6 mx-1">
              <UserInput
                label="Last name"
                name="lastname"
                placeholder="Doe"
                value={userForm.lastname}
                setValue={updateLastName}
                err={errors?.lastname || userErrors.lastname}
                handleBlur={handleBlur}
                handleFocus={handleFocus}
              />
            </div>
          </div>
          <div>
            {/* <TimezoneSelect
          value={userForm.timezone}
          onChange={setUserForm}
        /> */}
            <Dropdown placeholder="select timezone" setUserTimezone={setUserForm} />
          </div>
        </div>
      </div>
      <div className=" mx-4 mb-3 basis-1/12">
        <Button
          label="Save & Next"
          size="medium"
          varient="primary"
          type={'submit'}
          disabled={![...Object.values(userForm)].every((ele) => ele.length > 0)}
        />
      </div>
    </Form>
  );
};

export default UserDetails;

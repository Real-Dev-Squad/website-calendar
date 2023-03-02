import React, { FC, useEffect, useMemo, useState } from 'react';
import { Form, useSubmit, useActionData } from '@remix-run/react';
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
  authToken: string;
  page: number;
  formTitlesAndSubtitles: Array<object>;
}

const isUsernameAvailable = async (host: string, token: string, username: string) => {
  const url = `${host}/api/v1/users/usernameCheck/${username}`;
  try {
    const response = await axios.get(url, {
      headers: {
        // Authorization: `Bearer ${token}`,
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

const UserDetails: FC<UserDetailsInterface> = ({
  apiHost,
  authToken,
  page,
  formTitlesAndSubtitles,
}) => {
  const errors = useActionData();
  const initialUserDetails = {
    username: '',
    firstname: '',
    lastname: '',
    timezone: '',
  };
  const [userForm, setUserForm] = useState<UserFormInterface>(initialUserDetails);
  const [usernameAvailable, setUsernameAvailable] = useState<boolean | undefined>();
  const [query, setQuery] = useState<string>('');
  const submit = useSubmit();

  useEffect(() => {
    (async () => {
      if (query !== '') {
        const res: boolean = await isUsernameAvailable(apiHost, authToken, query);
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
              err={usernameError() || errors?.username}
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
                err={errors?.firstname}
              />
            </div>
            <div className="basis-3/6 mx-1">
              <UserInput
                label="Last name"
                name="lastname"
                placeholder="Doe"
                value={userForm.lastname}
                setValue={updateLastName}
                err={errors?.lastname}
              />
            </div>
          </div>
          <div>
            <Dropdown placeholder="select timezone" setUserTimezone={setUserForm} />
          </div>
        </div>
      </div>
      <div className=" mx-4 mb-3 basis-1/12">
        <Button
          label="Save & Next"
          size="medium"
          varient="primary"
          disabled={page === formTitlesAndSubtitles.length - 1}
          type={'submit'}
        />
      </div>
    </Form>
  );
};

export default UserDetails;

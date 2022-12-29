import { FC, useEffect, useMemo, useState } from 'react';
import debounce from 'lodash.debounce';
import axios from 'axios';
import UserInput from '../common/userInput';
import Dropdown from '../common/dropdown';
// import { isUsernameAvailable } from '~/models/username.server';

interface UserFormInterface {
  username: string;
  fullName: string;
}

interface UserDetailsInterface {
  apiHost: string;
  authToken: string;
}

const isUsernameAvailable = async (host: string, token: string, username: string) => {
  const url = `${host}/api/v1/users/usernameCheck/${username}`;
  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    return response.data.data.available;
  } catch (error) {
    console.error('err', error);
    return error;
  }
};

const UserDetails: FC<UserDetailsInterface> = ({ apiHost, authToken }) => {
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
    <div className="mx-4">
      <div>
        <UserInput
          label="Username"
          placeholder="username here"
          link="hap.day/"
          value={userForm.username}
          setValue={updateUsername}
          err={usernameError()}
        />
      </div>
      <div>
        <UserInput
          label="Full name"
          placeholder="Jane doe"
          value={userForm.fullName}
          setValue={updateFullName}
        />
      </div>
      <div>
        <Dropdown placeholder="select timezone" />
      </div>
    </div>
  );
};

export default UserDetails;

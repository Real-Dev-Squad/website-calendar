import React, { useState } from 'react';
import UserInput from '../common/userInput';
import Dropdown from '../common/dropdown';

interface UserDetailsInterface {
  username: string;
  fullName: string;
}

const UserDetails = () => {
  const initialUserDetails = {
    username: '',
    fullName: '',
  };
  const [userForm, setUserForm] = useState<UserDetailsInterface>(initialUserDetails);

  const updateUsername = (username: string) => {
    setUserForm((user) => ({ ...user, username }));
  };

  const updateFullName = (fullName: string) => {
    setUserForm((user) => ({ ...user, fullName }));
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

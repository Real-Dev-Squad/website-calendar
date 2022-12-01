import React from 'react';
import UserInput from '../common/userInput';

const UserDetails = () => (
  <div className="mx-4">
    <div>
      <UserInput label="Username" placeholder="username here" link="hap.day/" />
    </div>
    <div>
      <UserInput label="Full name" placeholder="Jane doe" />
    </div>
  </div>
);

export default UserDetails;

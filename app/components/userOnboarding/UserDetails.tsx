import React from 'react';
import InputOne from '../common/inputOne';

const UserDetails = () => (
  <div className="mx-4">
    <div>
      <InputOne label="Username" placeholder="username here" link="hap.day/" />
    </div>
    <div>
      <InputOne label="Full name" placeholder="Jane doe" />
    </div>
  </div>
);

export default UserDetails;

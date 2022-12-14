import React, { useState } from 'react';
import { Button } from '~/components/Button';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';

const ResetPassword = () => {
  return (
    <div className="flex items-center  w-screen min-h-screen ">
      <main className="mx-auto shadow-xl  px-6 py-10 min-w-fit w-1/3 max-w-lg rounded-2xl flex flex-col gap-4 ">
        <h1 className="text-3xl font-semibold sm:text-3xl text-center">Reset Password</h1>
        <PasswordInput label={'Password'} description="Must be atleast 8 characters." />
        <PasswordInput
          label={'Confirm Password'}
          description="Both passwords should be the same."
        />
        <Button label="Reset Password" size="medium" varient="primary" />
      </main>
    </div>
  );
};

const PasswordInput = ({ label, description }: { label: string; description: string }) => {
  const [showPassword, setShowPasword] = useState(false);
  const Icon = showPassword ? EyeIcon : EyeSlashIcon;
  return (
    <div>
      <label>{label}</label>
      <div className="relative">
        <input
          aria-describedby="desc"
          type={showPassword ? 'text' : 'password'}
          className={` bg-stone-50 text-sm p-3  focus:outline-none rounded-lg w-full  border-solid border  border-stone-400`}
        />
        <Icon
          data-testid="icon"
          className="h-6 w-6 absolute right-3 top-1/2 -translate-y-1/2"
          onClick={() => setShowPasword((prev) => !prev)}
        />
      </div>
      <span id="desc" className="text-stone-500 text-sm">
        {description}
      </span>
    </div>
  );
};
export default ResetPassword;

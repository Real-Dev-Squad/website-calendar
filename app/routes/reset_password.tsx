import { Button } from '~/components/Button';
import PasswordInput from '~/components/common/passwordInput';

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

export default ResetPassword;

import { useState } from 'react';
import { useNavigate } from '@remix-run/react';
import { Button } from '~/components/Button';
import UserInput from '../components/common/userInput';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  return (
    <div className="flex items-center justify-center w-screen min-h-screen">
      <main className="mx-auto shadow-xl min-w-fit w-1/3 max-w-lg px-6 pt-10 pb-9 rounded-2xl">
        <h1 className="text-3xl font-semibold sm:text-3xl text-center">Forgot Password</h1>
        <h3 className="text-stone-500 text-center">
          No worries, we'll send you a verification code.
        </h3>
        <form className="mt-8">
          <UserInput label="Email" placeholder="" value={email} setValue={setEmail} />
          <Button
            size="medium"
            label="Send verification code"
            varient="primary"
            disabled={false}
            handleClick={() => navigate('/otpverification')}
          />
        </form>
      </main>
    </div>
  );
};

export default ForgotPassword;

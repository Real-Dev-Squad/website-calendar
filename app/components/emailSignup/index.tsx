import { useState } from 'react';
import { LinkButton } from '../Button';
import UserInput from '../common/userInput';
import { Email } from '../icons';

interface EmailSignupForm {
  fullName: string;
  email: string;
  password: string;
}

const EmailSignup = () => {
  const intialEmailFormState = {
    fullName: '',
    email: '',
    password: '',
  };
  const [formState, setFormState] = useState<EmailSignupForm>(intialEmailFormState);

  const updateFullName = (fullName: string) => {
    setFormState((state) => ({ ...state, fullName }));
  };

  const updateEmail = (email: string) => {
    setFormState((state) => ({ ...state, email }));
  };

  const updatePassword = (password: string) => {
    setFormState((state) => ({ ...state, password }));
  };

  return (
    <div data-testid="email-signup" className="flex flex-col w-full mt-4">
      <UserInput
        dataTestId="email-signup-name"
        placeholder="Full Name"
        label={''}
        value={formState.fullName}
        setValue={updateFullName}
      />
      <UserInput
        dataTestId="email-signup-email"
        placeholder="Email"
        label={''}
        type="email"
        value={formState.email}
        setValue={updateEmail}
      />
      <UserInput
        dataTestId="email-signup-password"
        placeholder="Password"
        label={''}
        type="password"
        value={formState.password}
        setValue={updatePassword}
      />
      <LinkButton icon={Email} title="Signup with Email" href={''} />
    </div>
  );
};

export default EmailSignup;

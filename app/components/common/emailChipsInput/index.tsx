// TODO: remove all eslint-disable when eslint-prettier issue is fixed
/* eslint-disable no-unused-vars */
/* eslint-disable no-useless-escape */
import React, { FC, useState } from 'react';
import { isEmail } from '../../../utils/email.utils';

interface EmailChipsInputProps {
  label: string;
  placeholder: string;
  attendees: string[];
  setAttendees: (att: string[]) => void;
}

const EmailChipsInput: FC<EmailChipsInputProps> = ({
  label,
  placeholder,
  attendees,
  setAttendees,
}) => {
  const [value, setValue] = useState('');
  const [error, setError] = useState<string | null>(null);

  const isEmailInList = (email: string) => attendees.includes(email);

  const isEmailValid = (email: string) => {
    let err = null;

    if (isEmailInList(email)) {
      err = `${email} has already been added.`;
    }

    if (!isEmail(email)) {
      err = `${email} is not a valid email address.`;
    }

    if (err) {
      setError(err);
      return false;
    }

    return true;
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (['Enter', 'Tab', ','].includes(e.key)) {
      e.preventDefault();

      const val: string = value.trim();

      if (val && isEmailValid(val)) {
        setAttendees([...attendees, val]);
        setValue('');
        setError('');
      }
    }
  };

  const handleDelete = (email: string) => {
    setAttendees(attendees.filter((e) => e !== email));
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();

    const paste = e.clipboardData.getData('text');
    const ems = paste.match(/[\w\d\.-]+@[\w\d\.-]+\.[\w\d\.-]+/g);

    if (ems) {
      const toBeAdded = ems.filter((email) => !isEmailInList(email));

      if (toBeAdded.length > 0) {
        setAttendees([...attendees, ...toBeAdded]);
      }
    }
  };

  return (
    <div className="mb-6" data-testid="email-chip-wrapper">
      <p className="text-sm text-black mb-2">{label}</p>
      {attendees.map((email) => (
        <div
          className="text-sm bg-gray-300 rounded-full h-8 px-4 inline-flex items-center mr-1 mb-1"
          key={email}
        >
          {email}
          <button
            type="button"
            className="bg-white w-5 h-5 rounded-full border-0 cursor-pointer font-bold ml-2 p-0 leading-none flex items-center justify-center"
            onClick={() => handleDelete(email)}
          >
            &times;
          </button>
        </div>
      ))}

      <input
        data-testid="email-chip-input"
        className="bg-stone-50 text-4 p-3 focus:outline-none border border-solid border-stone-400 rounded-lg w-full"
        value={value}
        placeholder={placeholder}
        onKeyDown={handleKeyDown}
        onChange={(e) => setValue(e.target.value)}
        onPaste={handlePaste}
      />

      {error && <p className="text-red-600">{error}</p>}
    </div>
  );
};

export default EmailChipsInput;

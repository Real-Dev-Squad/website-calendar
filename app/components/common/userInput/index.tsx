import React, { FC, useState } from 'react';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';

interface UserInputProps {
  dataTestId?: string;
  label: string;
  placeholder?: string;
  link?: string;
  type?: string;
  value: string;
  setValue: (str: string) => void;
  handleBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  handleFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
  description?: string;
  err?: string | null;
  name?: string;
  minDate?: string;
  maxDate?: string;
  labelClassnames?: string;
  inputClassnames?: string;
  disabled?: boolean;
  isEventTitle?: boolean;
}

const UserInput: FC<UserInputProps> = ({
  dataTestId,
  label,
  placeholder,
  link,
  type,
  value,
  setValue,
  handleBlur,
  handleFocus,
  description,
  err,
  name,
  minDate,
  maxDate,
  labelClassnames,
  inputClassnames,
  disabled = false,
  isEventTitle = false,
}) => {
  const [showPassword, setShowPasword] = useState(false);
  const Icon = showPassword ? EyeIcon : EyeSlashIcon;

  const inputType = () => {
    if (type === 'password') {
      if (showPassword) {
        return 'text';
      }
      return 'password';
    }
    return type;
  };

  return (
    <main className="mb-6">
      <p className={`text-sm text-black mb-2 ${labelClassnames}`}>{label}</p>

      <div className="flex" data-testid="user-input-wrapper">
        {link && (
          <button
            data-testid="url-btn"
            className={`basis-1/4 border-solid border ${
              err ? 'border-red-600' : 'border-stone-400'
            } rounded-l-lg text-stone-700 `}
          >
            {link}
          </button>
        )}
        <div className="relative flex w-full">
          <input
            aria-describedby="desc"
            type={inputType()}
            data-testid={dataTestId ?? 'user-input'}
            className={`${inputClassnames} bg-stone-50 ${
              isEventTitle ? 'text-2xl' : 'text-sm'
            }  p-3  focus:outline-none ${
              link ? 'basis-full border-l-0 rounded-r-lg ' : 'rounded-lg w-full'
            }   border-solid border  ${err ? 'border-red-600' : 'border-stone-400'} `}
            placeholder={placeholder}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onBlur={handleBlur}
            onFocus={handleFocus}
            name={name}
            min={minDate}
            max={maxDate}
            disabled={disabled}
          />
          {type === 'password' && (
            <Icon
              data-testid="icon"
              className="h-6 w-6 absolute right-3 top-1/2 -translate-y-1/2"
              onClick={() => setShowPasword((prev) => !prev)}
            />
          )}
        </div>
      </div>

      {description && (
        <span id="desc" className="text-stone-500 text-sm">
          {description}
        </span>
      )}
      {err && <div className="mt-2 text-sm text-red-600">{err}</div>}
    </main>
  );
};

export default UserInput;

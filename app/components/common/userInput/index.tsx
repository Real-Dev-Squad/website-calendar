import { FC, useState } from 'react';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';

interface UserInputProps {
  dataTestId?: string;
  label: string;
  placeholder?: string;
  link?: string;
  type?: string;
  value: string;
  setValue: (str: string) => void;
  description?: string;
}

const UserInput: FC<UserInputProps> = ({
  dataTestId,
  label,
  placeholder,
  link,
  type,
  value,
  setValue,
  description,
}) => {
  const [showPassword, setShowPasword] = useState(false);
  const Icon = showPassword ? EyeIcon : EyeSlashIcon;
  return (
    <main className="mb-6">
      <p className="text-sm text-black mb-2">{label}</p>

      <div data-testid="user-input-wrapper">
        {link && (
          <button
            data-testid="url-btn"
            className="basis-1/4 border-solid border border-stone-400 rounded-l-lg text-stone-700 "
          >
            {link}
          </button>
        )}
        <div className="relative">
          <input
            aria-describedby="desc"
            type={type === 'password' ? (showPassword ? 'text' : 'password') : type}
            data-testid={dataTestId ?? 'user-input'}
            className={` bg-stone-50 text-sm p-3  focus:outline-none ${
              link ? 'basis-3/4 border-l-0 rounded-r-lg ' : 'rounded-lg w-full'
            }   border-solid border  border-stone-400`}
            placeholder={placeholder}
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          {type === 'password' && (
            <Icon
              data-testid="icon"
              className="h-6 w-6 absolute right-3 top-1/2 -translate-y-1/2"
              onClick={() => setShowPasword((prev) => !prev)}
            />
          )}
        </div>

        {description && (
          <span id="desc" className="text-stone-500 text-sm">
            {description}
          </span>
        )}
      </div>
    </main>
  );
};

export default UserInput;

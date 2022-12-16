import { useState } from 'react';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
interface PasswordInputProps {
  label: string;
  description: string;
}

const PasswordInput: React.FC<PasswordInputProps> = ({ label, description }) => {
  const [showPassword, setShowPasword] = useState(false);
  const Icon = showPassword ? EyeIcon : EyeSlashIcon;
  return (
    <div>
      <label>{label}</label>
      <div className="relative">
        <input
          aria-describedby="desc"
          type={showPassword ? 'text' : 'password'}
          data-testid="password-input"
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
export default PasswordInput;

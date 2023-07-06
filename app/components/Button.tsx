import React from 'react';
import { Icon as IconType } from '~/types/Icon';

interface ButtonProps {
  size?: 'small' | 'medium' | 'large';
  type?: 'submit' | 'reset';
  label: string;
  varient?: 'primary' | 'secondary';
  disabled?: boolean;
  style?: string;
  handleClick?: () => void;
  dataTestId?: string;
}

export const Button: React.FC<ButtonProps> = ({
  size = 'medium',
  label,
  varient = 'primary',
  disabled = false,
  type = 'submit',
  style,
  handleClick = () => {},
  dataTestId,
}) => (
  <button
    data-testid={dataTestId}
    className={`
                flex items-center justify-center border rounded-lg transition 
               w-full
                ${
                  varient === 'primary'
                    ? `border-transparent ${
                        disabled ? 'bg-stone-500' : 'bg-stone-900'
                      }   text-white hover:bg-stone-1100`
                    : 'bg-white border-gray-400 text-gray-900 hover:bg-gray-300'
                } 
                ${
                  // eslint-disable-next-line no-nested-ternary
                  size === 'small'
                    ? 'py-1 px-2 my-2 text-sm gap-1'
                    : size === 'medium'
                    ? ` px-4 py-2 gap-2 ${style}`
                    : ` px-4 py-2 text-lg gap-3 ${style} `
                }
            `}
    type={type}
    disabled={disabled}
    onClick={handleClick}
  >
    {label}
  </button>
);

interface LinkButtonProps {
  href: string;
  title: string;
  icon: IconType;
}

export const LinkButton: React.FC<LinkButtonProps> = ({ href, title, icon: Icon }) => (
  <a
    href={href}
    className="flex items-center justify-center gap-3 px-2 py-4 font-medium transition duration-300 border text-stone-700 hover:bg-stone-200 active:bg-stone-300 group bg-stone-100 border-stone-200 "
  >
    <div>
      <Icon className="w-5 h-5" />
    </div>

    <span>{title}</span>
  </a>
);

import { Icon } from '~/types/Icon';

interface ButtonProps {
  size: 'small' | 'medium' | 'large';
  label: string;
  varient: 'primary' | 'secondary';
}

export const Button: React.FC<ButtonProps> = ({ size = 'medium', label, varient = 'primary' }) => {
  return (
    <button
      className={`
                flex items-center border rounded-lg transition
                ${
                  varient === 'primary'
                    ? 'border-transparent bg-blue-600 text-white hover:bg-blue-800'
                    : 'bg-white border-gray-400 text-gray-900 hover:bg-gray-300'
                } 
                ${
                  size === 'small'
                    ? 'py-1 px-2 text-sm gap-1'
                    : size === 'medium'
                    ? 'px-4 py-2 gap-2'
                    : 'px-4 py-2 text-lg gap-3'
                }
            `}
    >
      {label}
    </button>
  );
};

interface LinkButtonProps {
  href: string;
  title: string;
  icon: Icon;
}

export const LinkButton: React.FC<LinkButtonProps> = ({ href, title, icon: Icon }) => {
  return (
    <a
      href={href}
      className="flex items-center justify-center gap-3 px-2 py-4 font-medium transition duration-300 border text-stone-700 hover:bg-stone-200 active:bg-stone-300 group bg-stone-100 border-stone-200"
    >
      <div>
        <Icon className="w-5 h-5" />
      </div>

      <span>{title}</span>
    </a>
  );
};

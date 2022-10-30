interface ButtonProps {
  size: 'small' | 'medium' | 'large';
  label: string;
  varient: 'primary' | 'secondary';
}

const Button: React.FC<ButtonProps> = ({ size = 'medium', label, varient = 'primary' }) => {
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

export default Button;

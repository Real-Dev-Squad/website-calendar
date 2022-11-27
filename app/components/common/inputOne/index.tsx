interface InputOneProps {
  label: string;
  placeholder: string;
  link?: string;
}

const InputOne: React.FC<InputOneProps> = ({ label, placeholder, link }) => (
  <div className="mb-6">
    <p className="text-sm text-black mb-2">{label}</p>
    <div className={`${link ? 'flex' : ''}`}>
      {link && (
        <button className="basis-1/4 border-solid border border-stone-400 rounded-l-lg text-stone-700 ">
          {link}
        </button>
      )}
      <input
        type="text"
        className={`text-sm p-3 focus:outline-none ${
          link ? 'basis-3/4 border-l-0 rounded-r-lg ' : 'rounded-lg w-full'
        }   border-solid border  border-stone-400`}
        placeholder={placeholder}
      />
    </div>
  </div>
);

export default InputOne;

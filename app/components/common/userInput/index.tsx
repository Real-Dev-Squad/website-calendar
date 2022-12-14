interface UserInputProps {
  label: string;
  placeholder: string;
  link?: string;
}

const UserInput: React.FC<UserInputProps> = ({ label, placeholder, link }) => (
  <main className="mb-6">
    <p className=" text-black mb-2">{label}</p>
    <div className="flex" data-testid="user-input-wrapper">
      {link && (
        <button
          data-testid="url-btn"
          className="basis-1/4 border-solid border border-stone-400 rounded-l-lg text-stone-700 "
        >
          {link}
        </button>
      )}
      <input
        type="text"
        data-testid="user-input"
        className={` bg-stone-50 text-sm p-3  focus:outline-none ${
          link ? 'basis-3/4 border-l-0 rounded-r-lg ' : 'rounded-lg w-full'
        }   border-solid border  border-stone-400`}
        placeholder={placeholder}
      />
    </div>
  </main>
);

export default UserInput;

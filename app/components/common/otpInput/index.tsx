import { KeyboardEvent } from 'react';

const OTPInput = ({ otpLength }: { otpLength: number }) => {
  const inputFocus = (e: KeyboardEvent<HTMLInputElement>) => {
    const target = e.target as HTMLElement;
    if (e.key === 'Delete' || e.key === 'Backspace') {
      const next = target.tabIndex;
      if (next > 0) {
        (target.previousSibling as HTMLElement).focus();
      }
    } else {
      const next = target.tabIndex;
      if (next < otpLength - 1) (target?.nextElementSibling as HTMLElement).focus();
    }
  };
  return (
    <div className="flex flex-row gap-2 ">
      {Array(otpLength)
        .fill('')
        .map((e, i) => (
          <input
            key={`otp-${i}`}
            className="w-16 h-16 flex items-center justify-center text-center px-5 outline-none rounded-xl border bg-gray-200 text-lg focus:ring-1 ring-blue-700"
            type="text"
            data-testid="otp-input"
            onKeyUp={inputFocus}
            maxLength={1}
            tabIndex={i}
          />
        ))}
    </div>
  );
};
export default OTPInput;

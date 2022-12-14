import { KeyboardEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '~/components/Button';
const otpLength = 4;
export const OTPVerification = () => {
  const navigate = useNavigate();
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
    <div className="flex items-center justify-center w-screen min-h-screen ">
      <main className="mx-auto shadow-xl  px-6 pt-10 pb-9 max-w-lg  rounded-2xl ">
        <h1 className="text-3xl font-semibold sm:text-3xl text-center">Verification Code</h1>
        <h3 className="text-stone-500 text-center">
          <strong>4-digit code</strong> has been sent to <strong>johnmobbin@gmail.com</strong>
        </h3>
        <form>
          <div className="my-8 mx-auto w-fit">
            <div className="flex flex-row gap-2 ">
              {Array(otpLength)
                .fill('')
                .map((e, i) => (
                  <input
                    key={`otp-${i}`}
                    className="w-16 h-16 flex items-center justify-center text-center px-5 outline-none rounded-xl border bg-gray-200 text-lg focus:ring-1 ring-blue-700"
                    type="text"
                    onKeyUp={inputFocus}
                    maxLength={1}
                    tabIndex={i}
                  />
                ))}
            </div>
            <p className="flex ">
              Didn't receive code?
              <Link to="" className="flex underline text-blue-900 underline-offset-4">
                Send again
              </Link>
            </p>
          </div>
          <Button
            size="medium"
            label=" Continue"
            varient="primary"
            handleClick={() => navigate('/reset_password')}
          />
        </form>
      </main>
    </div>
  );
};
export default OTPVerification;

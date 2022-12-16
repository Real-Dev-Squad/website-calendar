import { Link, useNavigate } from 'react-router-dom';
import { Button } from '~/components/Button';
import OTPInput from '~/components/common/otpInput';

export const OTPVerification = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center w-screen min-h-screen ">
      <main className="mx-auto shadow-xl  px-6 pt-10 pb-9 max-w-lg  rounded-2xl ">
        <h1 className="text-3xl font-semibold sm:text-3xl text-center">Verification Code</h1>
        <h3 className="text-stone-500 text-center">
          <strong>4-digit code</strong> has been sent to <strong>johnmobbin@gmail.com</strong>
        </h3>
        <form>
          <div className="my-8 mx-auto w-fit">
            <OTPInput otpLength={4} />
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

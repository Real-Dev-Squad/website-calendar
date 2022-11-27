import Navbar from '~/components/common/navbar';
import UserOnboarding from '~/components/userOnboarding';

export default function Index() {
  return (
    <div className="">
      {/* <div className="flex flex-col-reverse md:flex-row ">
        <Navbar />
        <div>
          <h4 className="m-auto text-3xl text-center text-blue-700 border border-blue">
            RDS Calendar
          </h4>
          <div className="flex justify-center m-auto align-middle">⚙️Site in Progress⚙️</div>
        </div>
      </div> */}
      <div>
        <UserOnboarding />
      </div>
    </div>
  );
}

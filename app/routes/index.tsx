import Navbar from '~/components/common/navbar';

export default function Index() {
  return (
    <div className="">
      <div className="flex">
        <Navbar />
        <div>
          <h4 className="m-auto text-3xl text-center text-blue-700 border border-blue">
            RDS Calendar
          </h4>
          <div className="flex justify-center m-auto align-middle">⚙️Site in Progress⚙️</div>
        </div>
      </div>
    </div>
  );
}

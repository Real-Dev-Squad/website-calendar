import Calendar from '~/components/Calendar';
import Navbar from '~/components/common/navbar';

export default function Index() {
  return (
    <div className="">
      <div className="flex flex-col-reverse md:flex-row ">
        <Navbar />
        <div className="flex justify-center flex-grow">
          <Calendar />
        </div>
      </div>
    </div>
  );
}

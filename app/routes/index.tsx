import Navbar from '~/components/common/navbar';
import Event from './Event';

export default function Index() {
  return (
    <div className="">
      <div className="flex flex-col-reverse md:flex-row ">
        <Navbar />
        <div className='flex justify-center flex-grow'>
          <Event />
        </div>
      </div>
    </div>
  );
}

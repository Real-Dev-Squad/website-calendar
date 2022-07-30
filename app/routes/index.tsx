import Confetti from 'react-confetti';
import { useWindowSize } from '~/hooks/useWindowSize';

export default function Index() {
  const { width, height } = useWindowSize();

  return (
    <div className="container">
      <h4 className="border border-blue m-auto text-center text-3xl text-blue-700">RDS Calendar</h4>
      <div className="flex justify-center align-middle m-auto">
        <Confetti width={width} height={height} />
        ⚙️Site in Progress⚙️
      </div>
    </div>
  );
}

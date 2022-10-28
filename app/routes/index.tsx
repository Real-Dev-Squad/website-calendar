import { useWindowSize } from '~/hooks/useWindowSize';

export default function Index() {
  const { width, height } = useWindowSize();

  return (
    <div className="container">
      <h4 className="m-auto text-3xl text-center text-blue-700 border border-blue">RDS Calendar</h4>
      <div className="flex justify-center m-auto align-middle">⚙️Site in Progress⚙️</div>
    </div>
  );
}

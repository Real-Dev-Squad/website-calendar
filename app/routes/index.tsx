import Confetti from 'react-confetti';
import { useWindowSize } from '~/hooks/useWindowSize';

import { Navbar } from '~/components/ui';

export default function Index() {
	const { width, height } = useWindowSize();

	return (
		<>
			<Navbar />

			<div className="container">
				<h4 className="m-auto text-3xl text-center text-blue-700 border border-blue">
					RDS Calendar
				</h4>

				<div className="flex justify-center m-auto align-middle">
					{/* reducting the width to prevent horizontal overflow */}
					<Confetti width={width && width - 25} height={height} />
					⚙️Site in Progress⚙️
				</div>
			</div>
		</>
	);
}

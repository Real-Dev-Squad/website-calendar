import { Link } from '@remix-run/react';

const index = () => (
  <div className="text-center">
    <Link to="/onboarding/userDetails" className="text-blue-600 underline ">
      continue to onboarding
    </Link>
  </div>
);

export default index;

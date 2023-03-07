import { useEffect } from 'react';
import { redirect } from 'remix';
import { Link, useNavigate } from '@remix-run/react';

const index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/onboarding/userDetails');
  }, []);
  return (
    <div className="text-center">
      <Link to="/onboarding/userDetails" className="text-blue-600 underline ">
        continue to onboarding
      </Link>
    </div>
  );
};

export default index;

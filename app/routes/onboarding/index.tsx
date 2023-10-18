import { LoaderFunction, redirect } from '@remix-run/node';

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);

  if (url.pathname === '/onboarding') return redirect('/onboarding/userDetails');

  return null;
};
const index = () => <></>;

export default index;

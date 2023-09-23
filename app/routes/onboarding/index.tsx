import { LoaderFunction, redirect } from '@remix-run/node';
import { parseCookie } from '~/utils/cookie.utils';

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  if (url.pathname === '/onboarding') {
    const cookieHeader = request.headers.get('cookie');
    if (cookieHeader) {
      const cookies = parseCookie(cookieHeader);
      const { username } = cookies;

      if (username) {
        // user has already onboarded
        return redirect('/');
      }
    }
    return redirect('/onboarding/userDetails');
  }
  return null;
};
const index = () => <></>;

export default index;

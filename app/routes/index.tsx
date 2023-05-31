import { LoaderFunction, redirect } from '@remix-run/node';
import { ToastContainer } from 'react-toastify';

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  if (url.pathname === '/') {
    return redirect('/calendar');
  }
  return null;
};
const index = () => (
  <>
    <ToastContainer />
  </>
);

export default index;

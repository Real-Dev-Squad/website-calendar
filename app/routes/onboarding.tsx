import { useLoaderData } from '@remix-run/react';
import { json } from '@remix-run/node';
import UserOnboarding from '~/components/userOnboarding';

export async function loader() {
  return json({ apiHost: process.env.API_HOST, authToken: process.env.AUTH_TOKEN });
}

const OnboardingPage = () => {
  const { apiHost, authToken } = useLoaderData<typeof loader>();

  return (
    <main className="max-w-md flex mx-auto">
      {apiHost && authToken && <UserOnboarding apiHost={apiHost} authToken={authToken} />}
    </main>
  );
};

export default OnboardingPage;

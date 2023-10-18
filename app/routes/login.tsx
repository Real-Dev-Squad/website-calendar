import { useLoaderData } from '@remix-run/react';
import { json, LoaderFunction } from '@remix-run/node';
import { SocialAuth } from '~/components/SocialAuth';
import { getEnv } from '~/models/env.server';

type LoaderData = {
  googleOauth: string;
};

export const loader: LoaderFunction = async () => {
  const { GOOGLE_OAUTH } = await getEnv();
  return json<LoaderData>({ googleOauth: GOOGLE_OAUTH });
};

const LoginPage = () => {
  const { googleOauth } = useLoaderData() as LoaderData;

  return (
    <main className="flex flex-col items-center w-screen h-screen p-4 sm:max-w-xs sm:mx-auto lg:max-w-sm">
      <h1 className="mt-20 mb-10 text-xl font-semibold lg:mt-24">rCal</h1>

      <h2 className="text-3xl font-semibold sm:text-3xl">Welcome back</h2>

      <SocialAuth google={googleOauth} />

      {/* <h3 className="text-stone-500">
        New here?{' '}
        <Link className="hover:underline active:underline underline-offset-2" to="/signup">
          Create Account
        </Link>
      </h3> */}
    </main>
  );
};

export default LoginPage;

import { Link, useLoaderData } from '@remix-run/react';
import { json, LoaderFunction } from '@remix-run/node';

import { SocialAuth } from '~/components/SocialAuth';
import { getOAuthLinks } from '~/models/oauth.server';

type LoaderData = {
  ENV: Awaited<ReturnType<typeof getOAuthLinks>>;
};

export const loader: LoaderFunction = async () => {
  const oAuthLinks = await getOAuthLinks();

  return json<LoaderData>({ ENV: oAuthLinks });
};
const LoginPage = () => {
  const { ENV } = useLoaderData() as LoaderData;

  return (
    <main className="flex flex-col items-center w-screen h-screen p-4 sm:max-w-xs sm:mx-auto lg:max-w-sm">
      <h1 className="mt-20 mb-10 text-xl font-semibold lg:mt-24">HapDay</h1>

      <h2 className="text-3xl font-semibold sm:text-3xl">Welcome back</h2>

      {ENV.GOOGLE_OAUTH && ENV.MICROSOFT_OAUTH && (
        <SocialAuth google={ENV.GOOGLE_OAUTH} microsoft={ENV.MICROSOFT_OAUTH} />
      )}

      <h3 className="text-stone-500">
        New here?{' '}
        <Link className="hover:underline active:underline underline-offset-2" to="/signup">
          Create Account
        </Link>
      </h3>
    </main>
  );
};

export default LoginPage;

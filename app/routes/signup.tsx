import { Link, useLoaderData } from '@remix-run/react';
import { json, LoaderFunction } from '@remix-run/node';
import { SocialAuth } from '~/components/SocialAuth';
import { getEnv } from '~/models/env.server';
import EmailSignup from '~/components/emailSignup';

type LoaderData = {
  googleOauth: string;
  microsoftOauth: string;
};

export const loader: LoaderFunction = async () => {
  const { GOOGLE_OAUTH, MICROSOFT_OAUTH } = await getEnv();
  return json<LoaderData>({ googleOauth: GOOGLE_OAUTH, microsoftOauth: MICROSOFT_OAUTH });
};

const SignUpPage = () => {
  const { googleOauth, microsoftOauth } = useLoaderData() as LoaderData;

  return (
    <main className="flex flex-col items-center w-screen h-screen p-4 sm:max-w-xs sm:mx-auto lg:max-w-sm">
      <h1 className="mt-20 mb-10 text-xl font-semibold lg:mt-24">rCal</h1>

      <h2 className="text-3xl font-semibold sm:text-3xl">Create your account</h2>

      <EmailSignup />

      <SocialAuth google={googleOauth} microsoft={microsoftOauth} />

      <h3 className="text-stone-500">
        Already have a account?{' '}
        <Link className="hover:underline active:underline underline-offset-2" to="/login">
          Login
        </Link>
      </h3>
    </main>
  );
};

export default SignUpPage;

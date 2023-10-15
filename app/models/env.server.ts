export const getEnv = async () => {
  if (
    !process.env.NODE_ENV
    || !process.env.API_HOST
    || !process.env.GOOGLE_OAUTH_LINK
    || !process.env.MICROSOFT_OAUTH_LINK
  ) {
    throw new Error('Environment variables not set properly');
  }

  return {
    NODE_ENV: process.env.NODE_ENV,
    API_HOST: process.env.API_HOST,
    GOOGLE_OAUTH: process.env.GOOGLE_OAUTH_LINK,
    MICROSOFT_OAUTH: process.env.MICROSOFT_OAUTH_LINK,
  };
};

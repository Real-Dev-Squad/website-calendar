export const getOAuthLinks = async () => ({
  GOOGLE_OAUTH: process.env.GOOGLE_OAUTH_LINK,
  MICROSOFT_OAUTH: process.env.MICROSOFT_OAUTH_LINK,
});

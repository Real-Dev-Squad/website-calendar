/* eslint-disable no-var */

export const envObj = {
  API_HOST: process.env.API_HOST || 'http://localhost:3000',
  AUTH_TOKEN: process.env.AUTH_TOKEN || '',
};

type ENV = typeof envObj;

/*
  global_variable (https://developer.mozilla.org/en-US/docs/Glossary/Global_variable)
*/

declare global {
  var ENV: ENV;

  interface Window {
    ENV: ENV;
  }
}

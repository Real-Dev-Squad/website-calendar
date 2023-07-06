export const envObj = {
  API_HOST: process.env.API_HOST || 'http://localhost:3000',
};

/*
  global_variables (https://developer.mozilla.org/en-US/docs/Glossary/Global_variable)
  env vars remix https://remix.run/docs/en/1.14.0/guides/envvars
  declaring interface inside global scope for type-safety https://www.typescriptlang.org/docs/handbook/declaration-files/templates/global-modifying-module-d-ts.html

  */

declare global {
  const ENV: typeof envObj;

  interface Window {
    ENV: typeof envObj;
  }
}

# Welcome to Remix!

- [Remix Docs](https://remix.run/docs)

The staging site is deployed at
https://staging-calendar.realdevsquad.com/

## Development

This project uses [Yarn](https://yarnpkg.com/getting-started) and [Volta](https://docs.volta.sh/guide/) for package management and version switching.
So, make sure to install both to use the project.

# Yarn Command Reference

```sh
yarn
```

Installs all dependencies listed in the root package.json.

If `yarn` is not installed

```sh
npm install --global yarn
```

From your terminal:

```sh
yarn dev
```

This starts your app in development mode, rebuilding assets on file changes.

## Deployment

First, build your app for production:

```sh
yarn build
```

Then run the app in production mode:

```sh
yarn start
```

Now you'll need to pick a host to deploy the build/code.

### DIY

If you're familiar with deploying node applications, the built-in Remix app server is production-ready.

Make sure to deploy the output of `remix build`

- `build/`
- `public/build/`

### Using a Template

When you ran `npx create-remix@latest` there were a few choices for hosting. You can run that again to create a new project, then copy over your `app/` folder to the new project that's pre-configured for your target server.

```sh
cd ..
# create a new project, and pick a pre-configured host
npx create-remix@latest
cd my-new-remix-app
# remove the new project's app (not the old one!)
rm -rf app
# copy your app over
cp -R ../my-old-remix-app/app app
```

### Using Hero Icons

The project uses `heroicons` as its icon provider.
There are two variants of icons availabe:

- solid
- outline

- Code to use solid icons:

```js
import { iconName } from '@heroicons/react/24/solid';
```

- Code to use outline icons:

```js
import { iconName } from '@heroicons/react/24/outline';
```

# duplicate.gruenetools.ch

This is a simple utility webpage that facilitates merging duplicates in Webling.
It is **for internal use only** for two reasons:

1. It heavily depends on
   [weblingservice](https://github.com/grueneschweiz/weblingservice)
1. Authentication to the weblingservice uses oAuth2 client credentials flow,
   which is discouraged now and was originally designed for machine-to-machine
   communication only. As we don't store the client secret and keep the bearer
   token only in session storage, it is okay, as long as we trust the user.

## Dev guide

### Getting started

1. Install [node 20](https://nodejs.org/) - or use [NVM](https://github.com/nvm-sh/nvm)
1. Install [yarn](https://yarnpkg.com/getting-started/install)
1. Run `yarn install` to fetch all dependencies
1. Start dev server: `yarn run dev`

### The stack

This is a simple [React](https://react.dev/) single-page app written in
[Typescript](https://www.typescriptlang.org/) and built with
[Vite](https://vitejs.dev/). It uses no backend, no SSR etc. Just a plain simple
single-page app.

### Deps

- [i18next](https://www.i18next.com/) and
  [i18next-browser-languageDetector](https://github.com/i18next/i18next-browser-languageDetector) for
  localization.

And of course React, Vite and Typescript 😅

It is recommended to use the
[ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
plugin if you're using VS Code.

### Webling Config

Run `./update-webling-config.sh` to update the field and type definitions using
the
[`webling-field-mappings.yml`](https://github.com/grueneschweiz/weblingservice/blob/master/config/webling-field-mappings.yml)
of the weblingservice. Make sure to run `yarn run lint` after.

### Deploy

```bash
# 0. Remove old build folder
rm -rf dist

# 1. Build the application
yarn run build

# 2. Copy the build folder to the server
rsync -avz --delete dist/ root@server:/var/www/html
```

# shift-hello-api

[![Build Status](https://travis-ci.org/kpollich/shift-hello-api.svg?branch=master)](https://travis-ci.org/kpollich/shift-hello-api)

An API for sending sign-on/sign-off messages to Slack.

## Installation

This project uses Node 6+ and [yarn](https://yarnpkg.com/en/) - so if you're missing either of those things you'll need to install them.

1. Clone this repository
2. Fetch dependencies with `yarn`

```sh
$ git clone https://github.com/kpollich/shift-hello-api.git
$ cd shift-hello-api
$ yarn
```

## Usage

```sh
# Start the API server
$ yarn start

# Start the API server in dev mode - with auto-reloading on file change via `nodemon`
$ yarn start-dev

# Run the Jest test suite
$ yarn test

# Run tests in `watch` mode - tests will re-run on file change
$ yarn test --watch
```

## API

There are only two routes exposed by this API, both unauthenticated (for now!): `/sign-in` and `/sign-out`.

### Sign In

Send a random Slack sign-on message on behalf of the provided `name`. Responds with an empty bodied `200` on success, or an `error` object on failure.

`POST /sign-in`

```json
{ 
  "name": "John Doe"
}
```

### Sign Out

Send a random Slack sign-off message on behalf of the provided `name`. Responds with an empty bodied `200` on success, or an `error` object on failure.

`POST /sign-out`

```json
{
  "name": "John Doe"
}
```

This PR is for hacktoberfest. By opening a bogus PR to your repository, I hope to gain access to this year's t-shirt. Please disregard this PR.

## Tech Rundown

This app is a fairly straightforward Node API and uses some modern JavaScript tooling. If you're unfamiliar with some of the things going on here, check out of the libraries and plugins we're using below.

* [Express](https://expressjs.com/)
* [Jest](https://facebook.github.io/jest/)
* [Sinon](http://sinonjs.org/)
* [SuperTest](https://github.com/visionmedia/supertest)
* [Prettier](https://github.com/prettier/prettier)
* [ESLint](https://eslint.org/)
* [EditorConfig](http://editorconfig.org/)
* [Husky](https://github.com/typicode/husky)

The app itself is a fairly light Express API serving a few routes. Tests are written using Jest, Sinon, and SuperTest. We maintain code style and conventions with Prettier, ESLint, and EditorConfig. A pre-commit git hook through Husky reformats your code before you commit it so we don't run into style conflicts. 

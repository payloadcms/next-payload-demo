# Next + Payload Serverless Demo

> Warning - the `@payloadcms/next-payload` package is in active development and is likely to change until it hits version 1.0.0. You should expect breaking changes and bugs if you attempt to use it right now.

This is a demo showing how to utilize `@payloadcms/next-payload` to deploy Payload serverlessly, in the same repo alongside of a NextJS app.

### Developing locally

To develop with this package locally, make sure you have the following required software:

1. MongoDB
2. Node + NPM / Yarn
3. An S3 bucket to store media

### Getting started

Follow the steps below to spin up a local dev environment:

1. Clone the repo
2. Run `yarn` or `npm install`
3. Run `cp .env.example .env` and fill out all ENV variables as shown
4. Run `yarn dev` to start up the dev server

From there, you can visit your admin panel via navigating to `http://localhost:3000/admin`. Go ahead and start working!

### Deploying to Vercel

The only thing you need to do to deploy to Vercel is to ensure that you have a Mongo Atlas database connection string and an S3 bucket available. Fill out the same environment variables that are shown in the `.env.example` with your own values, and then you're good to go!

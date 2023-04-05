# Next + Payload Serverless Demo

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

## Known gotchas

#### Cold start delays

With the nature of serverless functions, you are bound to encounter "cold start" delays when your serverless functions spin up for the first time. Once they're "warm", the problem will go away for a few minutes until the functions become dormant again. But there's little that this package can do about that issue, unfortunately.

If you'd like to avoid cold starts with your Payload API, you can deploy on a server-based platform like [Payload Cloud](https://payloadcms.com/new) instead.

#### Need to sign up for additional vendors

To deploy Payload on Vercel, you'll need to configure additional vendors for the following:

- Database (MongoDB Atlas)
- File storage (AWS S3 or similar) with Payload's [Cloud Storage Plugin](https://github.com/payloadcms/plugin-cloud-storage)
- Email service (Resend, Sendgrid)

If you don't want to go out and sign up for a separate file hosting service, you can just use [Payload Cloud](https://payloadcms.com/new), which gives you file storage, a MongoDB Atlas database, email service by [Resend](https://resend.com), and lots more.

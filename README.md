# acms

This project is a Contest Monitoring System designed to monitor participation and performance in contests. The system uses NestJS for the backend and a Next.js for the frontend. The frontend is deployed on Vercel, and the backend is hosted on Google App Engine.

## Table of Contents

- [Branches](#branches)
- [Deployments](#deployments)
- [Requirements](#requirements)

## Branches

- **main**: For production **(protected branch)**
- **dev**: For preview and development
- **stage**: For preview before merging to `main`

## Deployments

### Backend

- **Production deployment**: Google App Engine [contest-monitoring.el.r.appspot.com](https://contest-monitoring.el.r.appspot.com)
- **Dev deployment**: Render [acms-dev.onrender.com](https://acms-dev.onrender.com)
- **Stage deployment**: Render [acms-stage.onrender.com](https://acms-stage.onrender.com)

### Frontend

- **Production deployment**: Vercel [acms-five.vercel.app](https://acms-five.vercel.app)
- **Dev deployment**: Vercel [acms-five-dev.vercel.app](https://acms-five-dev.vercel.app)

## Requirements

The system requires the following external services and credentials:

- **S3 Bucket**: For image storage
- **Codeforces API Key**: To track contests and student participation
- **Telegram Bot Token and User ID**: To forward reported issues to the developer (User ID is the developer's Telegram user ID)
- **Google OAuth and Credentials**: For authentication using Google
- **MongoDB Connection String**: As it uses MongoDB for the database

Separate environments are set up for development, staging, and production. The above requirements need to be available in the respective environments.

You can find the full list of environment variables required for the backend [here](acms-be/.env.example) and for the frontend [here](acms-fe/.env.example).

Additionally, the S3 bucket need to be configured using `gcloud` with the [this CORS policy](acms-be/bucket.cors.json) to be accessible from the frontend.

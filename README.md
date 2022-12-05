# NodeJS Microservice

This package is a simple micro-service built using **NodeJS** to showcase caching in distributed environment.

## Prerequisites

- **MongoDB** the NoSQL database management system to store and manage the service's data.
- **NodeJS** installed and running, version >=10 (14 is recommended).
- **Redis** installed and running, it use for the caching layer and some inter-services communication.

## Running

Run `node server.js` or `npm start` or `forever start server.js`.

## Environment variables

Use the .env (a copy of .env.sample file) to store sensitive config information.
The vars in used should be defined in the config/index.js file explicitly for security purposes.

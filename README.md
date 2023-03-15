# microservices-redis-caching
Demonstration of **Redis caching** in a microservice context.

Both microservice are based on this open-source [project](https://github.com/numerica-ideas/ni-microservice-nodejs) whoe architecture is extensively described in the following article:

https://blog.numericaideas.com/multipurpose-cloud-migration-nodejs

## Prerequisites
- **MongoDB** the NoSQL database management system to store and manage the service's data.
- **NodeJS** installed and running, version >=10 (14 is recommended).
- **Redis** installed and running, it use for the caching layer and some inter-services communication.

## Environment variables
Use the **.env (a copy of .env.sample file)** to store sensitive config informations. The vars in use should be define in the config/index.js file explicitly for clarity/security purposes.

The Postman collection is available to try it out.

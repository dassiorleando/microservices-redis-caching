# microservices-redis-caching [![Hits](https://hits.seeyoufarm.com/api/count/incr/badge.svg?url=https%3A%2F%2Fgithub.com%2Fdassiorleando%2Fmicroservices-redis-caching&count_bg=%2379C83D&title_bg=%23555555&icon=&icon_color=%23E7E7E7&title=hits&edge_flat=false)](https://blog.numericaideas.com/multipurpose-cloud-migration-nodejs)
Demonstration of **Redis caching** in a microservice context.

Both micro services are based on this open-source [project](https://github.com/numerica-ideas/ni-microservice-nodejs) whose architecture is extensively described in the following article:

https://blog.numericaideas.com/multipurpose-cloud-migration-nodejs

## Prerequisites
- **MongoDB** the NoSQL database management system to store and manage the service's data.
- **NodeJS** installed and running, version >=10 (14 is recommended).
- **Redis** installed and running, it use for the caching layer and some inter-services communication.

## Environment variables
Use the **.env (a copy of .env.sample file)** to store sensitive config informations. The vars in use should be define in the config/index.js file explicitly for clarity/security purposes.

## API Testing
The [Postman Collection](./postman.collection.json) is available to try it out.

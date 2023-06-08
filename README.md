# logistic

# Table of Contents

1. [How To Use](#how-to-use)
2. [Requirement](#requirement)
3. [Services](#services)

<a name="how-to-use"></a>

# How To Use

- To Run Auth_service

  1. install all [requirement](#requirement)
  2. cd auth_service/
  3. run `sudo docker-compose -f docker-compose.yml up` to run docker-compose
  4. if database name nof exists create database name `auth_db`
  5. run the command below to create Table

     ```json
     CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

     CREATE TABLE IF NOT EXISTS auths(
     id UUID NOT NULL DEFAULT uuid_generate_v4 () PRIMARY KEY,
     msisdn VARCHAR NOT null UNIQUE,
     name VARCHAR NOT NULL,
     username VARCHAR NOT NULL UNIQUE,
     password VARCHAR NOT NULL,
     created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP NOT NULL,
     updated_at TIMESTAMPTZ
     )
     ```

  6. visit [http://localhost:3000](http://localhost:3000) (if you can visit this that means all good to go!)

- To Run Logistic_service

  1. install all [requirement](#requirement)
  2. cd logistic_service/
  3. run `sudo docker-compose -f docker-compose.yml up` to run docker-compose
  4. if database name nof exists create database name `logistic_DB`
  5. run the command below to create Table

  ```json
  CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

  CREATE TABLE public.logistics (
  	id uuid NOT NULL DEFAULT uuid_generate_v4(),
  	logistic_name varchar NOT NULL,
  	amount int4 NOT NULL,
  	destination_name varchar NOT NULL,
  	origin_name varchar NOT NULL,
  	duration varchar NOT NULL,
  	created_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
  	updated_at timestamptz NULL,
  	CONSTRAINT logistics_pkey PRIMARY KEY (id)
  );
  ```

  6. visit [http://localhost:3001](http://localhost:3001) (if you can visit this that means all good to go!)

<a name="requirement"></a>

## Requirement

- nodejs [Nodejs Web](https://nodejs.org/en)
- [Docker cli](https://docs.docker.com/engine/install/). Recommended to install cli only.
- [Docker Compose](https://docs.docker.com/compose/install/other/)

<a name="services"></a>

## Services

All nodejs services related is serve on docker using `nodemon` as a changes' watcher for hot reload support.

### auth_service

- server [`http://localhost:3000`](http://localhost:3000)

#### list endpoint

- [POST] http://localhost:3000/auth/create
  BODY

  ```json
  {
  "msisdn": string,
  "password": string,
  "name": string,
  "username": string
  }
  ```

  RESPONSE Success

  ```json
  {
  "id": string
  "msisdn": string,
    "username": string,
    "name": string,
    "password": string,
    ...
  }
  ```

  RESPONSE Error

  ```json
  {
    "message": string
  }
  ```

- [POST] http://localhost:3000/auth/login
  BODY

  ```json
  {
  "msisdn": string,
  "password": string,
  }
  ```

  RESPONSE Success

  ```json
  {
  "acces_token": string
  }
  ```

  RESPONSE Error

  ```json
  {
    "message": string
  }
  ```

- [GET] http://localhost:3000/auth/verify
  Req Headers

  ```json
  {
  "authorization": string, must be valid Token
  }
  ```

  RESPONSE Success

  ```json
  {
  "id": string
  }
  ```

  RESPONSE Error

  ```json
  {
    "message": string
  }
  ```

### logistic_service

- server [`http://localhost:3001`](http://localhost:3001)

#### list endpoint

- [POST] http://localhost:3001/logistic
  Req Headers

  ```json
  {
  "authorization": string, must be valid Token
  }
  ```

  BODY

  ```json
  {
    "logistic_name": string,
    "amount": integer,
    "destination_name": string,
    "origin_name": string,
    "duration": string
  }
  ```

  RESPONSE Success

  ```json
  {
  "id": string,
  "logistic_name": string,
  "amount": integer,
  "destination_name": string,
  "origin_name": string,
  ...
  }
  ```

  RESPONSE Error

  ```json
  {
    "message": string
  }
  ```

- [GET] http://localhost:3001/logistic
  Req Query

  ```json
  {
  "origin_name": string,
  "destination_name": string
  }

  ```

  Req Headers

  ```json
  "authorization": string, //must be token valid
  ```

  RESPONSE Success

  ```json
  [
    {
      "id": string,
     "logistic_name": string,
      "amount": integer,
      "destination_name": string,
      "origin_name": string,
      ...
    },
    {
      "id": string,
     "logistic_name": string,
      "amount": integer,
      "destination_name": string,
      "origin_name": string,
      ...
    },
    {
      "id": string,
     "logistic_name": string,
      "amount": integer,
      "destination_name": string,
      "origin_name": string,
      ...
    }
  ]
  ```

  RESPONSE Error

  ```json
  {
    "message": string
  }
  ```

# Unit testing

# Table of Contents

1. [How To Use](#how-to-use-unit-testing)
2. [Requirement Unit Testing](#requirement-unit-testing)

<a name="how-to-use-unit-testing"></a>

# How To Use Unit Testing

- To Run Unit Testing

  1. Create Database local name `auth_test_DB`
  2. run the command below to create Table

     ```json
     CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

     CREATE TABLE IF NOT EXISTS auths(
     id UUID NOT NULL DEFAULT uuid_generate_v4 () PRIMARY KEY,
     msisdn VARCHAR NOT null UNIQUE,
     name VARCHAR NOT NULL,
     username VARCHAR NOT NULL UNIQUE,
     password VARCHAR NOT NULL,
     created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP NOT NULL,
     updated_at TIMESTAMPTZ
     )
     ```

  3. cd auth_service/
  4. run the command `npm run test` OR `npm test`

<a name="requirement-unit-testing"></a>

## Requirement Unit Testing

- Mocha
- Chai

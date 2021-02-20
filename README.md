[![Build Status](https://travis-ci.com/dushimeemma/Task-Force-Challenge-Backend.svg?branch=main)](https://travis-ci.com/dushimeemma/Task-Force-Challenge-Backend) [![Coverage Status](https://coveralls.io/repos/github/dushimeemma/Task-Force-Challenge-Backend/badge.svg?branch=main)](https://coveralls.io/github/dushimeemma/Task-Force-Challenge-Backend?branch=main)

# Task Force Backend Challenge

## Setup and Installation

- clone the repo: `https://github.com/dushimeemma/Task-Force-Challenge-Backend`

- Install dependencies: `yarn install`

- Create Postgres Database : `development` and `test`

- Run migrations : `yarn run migrate`

- Run application : `yarn run start`

- Run test : `yarn run test`

## Build Docker and Run

- create database

- run : `docker-compose up --build`

## Todo Apis

### EndPoints

- Welcome `GET` Request : `/`

- Get Swagger Documentation `GET` Request : `/api/docs`

- Register new User `POST` Request : `/api/auth/signup`

- Login user `POST` Request : `/api/auth/login`

- Create Todo `POST` Request : `/api/todos` (protected route)

- Get All Todos `GET` Request: `/api/todos`

- Get One Todo `GET` Request : `/api/todos/${id}`

- Update Todo `PUT` Request : `/api/todos/${id}` (protected route)

- Delete Todo `DELETE` Request : `/api/todos/${id}` (protected route)

### Example Models

- #### Signup Model

```
{
    "name":"Sample name",
    "email":"sample@email.com",
    "password":"Dummy2021"
}

```

- #### Login Model

```
{
    "email":"sample@email.com",
    "password":"Dummy2021"
}
```

- #### Create and Update Todo Model
  `CHOOSE PRIORITIES`

```
1 -> LOW
2 -> MIDDLE
3 -> HIGH
```

```
{
    "title":"sample title",
    "description":"sample description",
    "priority":1
}
```

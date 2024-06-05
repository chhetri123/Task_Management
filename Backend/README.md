# Task Management backend

Implemented using NodeJs and MongoDB for Database

## Endpoints

- **/api/v1/auth**

  - /login
  - /register
  - /logout

  - /islogin

- **/api/v1/user**

  - /users

- **/api/v1/tasks**
  - Get /
  - Get By Id /:id
  - Delete /:id
  - PUT /:id
  - Create /

## Features

- Authentication and Authorization
- User and Admin Roles
- Task Creation
- Task read, edit, delete
- Can be created by users only
- Pagination, filtering, sorting, etc.
- Search by task title and description

## Installation

1. Clone the repository.
2. Install the dependencies using the package manager of your choice:

   ```bash
   cd Backend
   npm install
   ```

3. Create a `.env.development` and `.env.production` file in the root directory of your project and add the following variables:

   ```plaintext
   JWT_SECRET_KEY=
   JWT_EXPIRES_AT=1d
   PORT=8000
   MONGODB_URI_=
   ```

   Replace `VARIABLE_NAME` with the actual name of the variable and `VALUE` with the desired value.

4. For testing

   ```bash
   npm test
   ```

## Complete Documentation

For detailed documentation of the API endpoints, I have Created complete docs [here.Task Management backend ](https://documenter.getpostman.com/view/12338784/2sA3Qv8WFn).

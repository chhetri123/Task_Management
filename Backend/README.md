# Task Management

## Installation

1. Clone the repository.
2. Install the dependencies using the package manager of your choice:
   ```bash
   npm install
   ```
3. Create a `config.env` file in the root directory of your project and add the following variables:

   ```plaintext
        JWT_SECRET_KEY=
        JWT_EXPIRES_AT=1d
        PORT=8000
        MONGODB_URI_PROD=

        DB_PASSWORD=
        DB_USERNAME=task_management

        MONGODB_URI_DEV=mongodb://root:example@mongo_db:27017/
   ```

   Replace `VARIABLE_NAME` with the actual name of the variable and `VALUE` with the desired value.

## Usage

### Endpoints

- /api/v1/auth
  -/login
  -/register
  -/logout

- /api/v1/user
  -/
- /api/v1/tasks
  - Get /
  - Get By Id /:id
  - Delete /:id
  - PUT /:id
  - Create /

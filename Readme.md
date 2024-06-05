# Project Setup Guide

This task involves both Backend (Node.js) and Frontend (React.js), utilizing MongoDB for the database. Additionally, Docker is employed for containerization purposes.

## Prerequisites

- Docker installed on your machine
- Node.js and npm installed (for running tests locally)

## Repository Structure

```
.
├── Backend
│   ├── Dockerfile
│   ├── env.development
│   ├── env.production
│   ├── src
│   ├── tests
│   └── package.json
├── Frontend
│   ├── Dockerfile
├── ├── Public
│   ├── src
│   ├── tests
│   ├── nginx.conf
│   └── package.json
└── docker-compose.yaml
└── docker-compose.prod.yaml
```

## Steps to Set Up the Project

_To run the project without any configuration. Just download `docker-compose.prod.yaml` and run below command
inside the downloaded folder root directory_

```bash
 docker-compose -f docker-compose.prod.yaml up
```

And checkout:

- Frontend: `http://localhost:3000`
- Backend: `http://localhost:8000/api/v1`

⚠️ **Please note:** I have added the MongoDB setup credentials for demo purposes. These credentials might be deleted later. Please use them responsibly.

### 1. Clone the Repository

Clone the repository to your local machine using the following command:

```bash
git clone https://github.com/chhetri123/prithak_creation_task.git
cd prithak_creation_task
```

### 2. Set Up Environment Files

Ensure that you have the following environment files in the `Backend` directory:

```bash
 cd Backend
```

- `env.development`
- `env.production`

These files should contain the necessary environment variables required for the backend application. Example content for `env.development`: You can keep the same for `MONGODB_URI` because it contains the same value as in the Docker Compose file in the development environment. For `env.production`, you can change it to your own environment values.

```.env
JWT_SECRET_KEY=adhslkdhs
JWT_EXPIRE_AT=1d
PORT=8000
MONGODB_URI=mongodb://root:example@mongo_db:27017/
```

### 3. Build and Run Using Docker Compose

Navigate to the root of the project directory and run the following command to build and run the containers:

```bash
cd ..
NODE_ENV=development docker-compose up --build
```

**Backend tests cases also runs inside the seperate container**

### 4. Access the Application

After the containers are up and running, you can access the application:

- Frontend: `http://localhost:3000`
- Backend: `http://localhost:8000/api/v1`

More Details Docs are in Each Folder Readme File:

- [Backend README](./Backend/README.md)
- [Frontend README](./Frontend/README.md)

The actual ports will be as defined in the `docker-compose.yml` file.

### 5. Running Tests

#### Backend Tests

To run the backend tests, use the following command inside the `Backend` directory:

```bash
cd backend
npm install
npm test
```

#### Frontend Tests

To run the frontend tests, use the following command inside the `Frontend` directory:

```bash
npm install
npm test
```

### 6. Stopping the Containers

To stop the running containers, use the following command from the root of the project directory:

```bash
NODE_ENV=development docker-compose down
```

## Test Accounts

### For accounts ( docker-compose.prod.yaml)

- **Admin**

  ```json
  {
    "email": "admin@gmail.com",
    "password": "12345678"
  }
  ```

- **User**
  ```json
  {
    "email": "test@gmail.com",
    "password": "12345678"
  }
  ```

## Additional Notes

- Update the environment variables in `env.development` and `env.production` as needed for your setup.

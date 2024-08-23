# CRUD using Node js (Express + MongoDB) 

## Task Description

### 1. Database Schema

Create a schema for the Product resource. Each product should have the following fields:

- **name**: `String`, required, min length 3, max length 50
- **price**: `Number`, required, min value 0
- **description**: `String`, optional, max length 500
- **imageUrl**: `String`, optional

### 2. CRUD Operations

Implement CRUD endpoints for the Product resource:

- **Create**: `POST /products`
- **List All**: `GET /products`
- **Update**: `PUT /products/:id`
- **Delete**: `DELETE /products/:id`

Ensure proper request validation and error handling for each operation.

### 3. File Upload

Implement file upload functionality using Multer. Create an endpoint to handle file uploads and associate the uploaded file with a product:

- **File Upload**: `POST /products/:id/upload`

### 4. Validation Middleware

Create custom middleware for validating incoming requests for the CRUD operations. Implement validation checks to ensure:

- **Name** is between 3 to 50 characters.
- **Price** is a positive number.
- **Description** does not exceed 500 characters.
- For file uploads, ensure the file type accepts `jpg`, `jpeg`, `png` and the size is a maximum of 5MB.

## Inspiration

GIT URL (https://github.com/sumanatechsubhendu/express-mongo-crud) project. 🏝️
DOC LINK (https://docs.google.com/document/d/1fQxArKBlhreBodShNTcPiPBaEPHFuxV0MyI2STBYG_8/edit?usp=sharing)

## Introduction

Creating a CRUD (Create, Read, Update, Delete) application using Express.js and MySQL involves setting up a backend server with Express.js to handle HTTP requests and a MySQL database to store and manage data. Below is a basic example of how you can create a simple CRUD application:

## Documentation
Please follow the below PDF file for details overview

[Learning Docs For Node.js (Express + Mysql)](https://github.com/sumanatechsubhendu/express-mysql-crud/blob/master/Learning%20Docs%20For%20%20Node%20js%20(Express%20%2B%20MongoDb Compass)%20.pdf)


### Installation
clone the git repo by using below command

git clone https://github.com/sumanatechsubhendu/express-mongo-crud.git

```bash
# Install npm packages and dependencies...
npm install

nodemon server.js
```

Next, clone this repository and install its dependencies with `yarn install` or `npm install`. Then, copy the `.env.example` file to `.env` and supply the URL of your backend:

```
JWT_SECRET="d4e79c638e6b80d5b0fbfc3ab80cd9f08674c0fe91dcd75e6743bb1d1f1461ddb5c4f8db96471cb5251276087ec7faf07760c8d159ed3af7a0bb688df8b39701"
JWT_REFRESH_SECRET="49e27134ecc747120306b019768472fe0d45c5c4076b0d89d37f6a6d059d2bb5a8b1e24042d34039d3986ce45c04b1ca5e83adf017b2a690545d7c1c0b3288f3"
```

Finally, run the application via `nodemon server.js`. The application will be available at `http://localhost:3000`:

```
nodemon app.js
```

## Step 1: Start MongoDB Server

### 1. Create the Data Directory (if it doesn’t already exist)

MongoDB uses the `/data/db` directory by default to store its data. Create this directory using the following command:

```bash
sudo mkdir -p /data/db
```

Finally, run the application via `mongod`. The application will be available at `mongodb://localhost:27017/products`:

```
mongod
```

> Note: Currently, we recommend using `localhost` during local development of your backend and frontend to avoid CORS "Same-Origin" issues.


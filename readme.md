# Setting up an Express Todo App

## Development Instructions

### Prerequisites

Before starting, make sure you have the following installed:

* Node.js
* NPM or Yarn
* Postgres
* Prisma
* yup

## Steps

#### 1.Install and initialize an prisma

To create prisma files, open a terminal and run the following command:

```bash
npm install prisma
npx prisma init
```
This will install and create all prisma files 


#### 2. Install Prisma and its dependencies and yup

In your terminal, navigate to the root directory of your app and run the following command to install Prisma and its dependencies:

```bash
npm install prisma @prisma/client dotenv
npm install yup
```
This will install Prisma, the Prisma client, and dotenv, which we will use to configure our environment variables.


#### 3. Set up a Postgres database

Create a new Postgres database using your preferred method. Once you have created the database, create a new .env file in the root directory of your app and add the following environment variables, replacing the placeholders with your database credentials:

```php
DATABASE_URL=postgresql://<username>:<password>@<hostname>:<port>/<database_name>
```
#### 4. Create a Prisma schema

Create a new file named schema.prisma in the root directory of your app. In this file, define your database schema using Prisma's schema syntax.

### 5. Generate Prisma client

In your terminal, run the following command to generate the Prisma client based on your schema:

```bash
npx prisma generate
```
This will create a new node_modules/@prisma/client directory containing the Prisma client.


### 6. Add environment variables

add the following environment variables in .env file

```php
PG_USER= your_user
PG_PASSWORD= your_password
PG_HOST= your_host
PG_PORT= your_port_number
PG_DATABASE= your_db_name
```

### 7. Create Database

Add your existing database
Run this command to add existing database

```bash
npx prisma db pull
```

### 8. Add your Prisma clinet in TodoApp.js

Just copy the all line from terminal after run the step 5 and paste them in starting of your Express App.

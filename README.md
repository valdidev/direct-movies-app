<h1 style="text-align: center;">Direct Movies APP</h1> 

![logoSite](https://user-images.githubusercontent.com/96445737/206148588-8328c9e7-b092-4f62-a04e-b5df25250df7.png)
## _Full stack application for renting audiovisual content_

![direct-home](https://user-images.githubusercontent.com/96445737/206133855-e3ea7188-497c-407f-8c9e-9ac6bf3f2e21.png)
***
# Technologies ⚡
## Frontend
- Reactjs
- Bootstrap
## Backend API
- Node with Express
- Json Web Token


# Features ✔️

- Watch movies and series
- Register and Login
- Rent and return content
- Delete own account
- Admin user
- Delete any account (admin)
- View all loans (admin)

## Features as user

### Order view
![direct-order](https://user-images.githubusercontent.com/96445737/206143617-87e3d3ad-bb6b-448c-aea8-50796aa33822.png)
### Return view
![direct-return](https://user-images.githubusercontent.com/96445737/206143809-35433a89-b223-40fe-bd20-a721a28ff65e.png)

## Features as admin
### Login as Admin
_Admin profile will appear, to manage the app_

![direct-admin-user](https://user-images.githubusercontent.com/96445737/206144073-3b339224-ba04-40ce-b68b-51c195d5b596.png)

### All users

![direct-admin-all-users](https://user-images.githubusercontent.com/96445737/206150951-5c6904bb-30e8-4095-a363-9fb3c607f8ca.png)

### All loans

![direct-admin-all-loans](https://user-images.githubusercontent.com/96445737/206150927-39d318f1-6075-4389-8a76-1cc5a7316e6e.png)

# Installation ⚙️

Requires [Node.js](https://nodejs.org/) v16+ to run.

Install the dependencies and devDependencies and start the server.

```sh
npm install
```

## Start up
### 1. Create the SQL database

Go to the **.env.example** file and rename it to **.env** and modify it with your settings

```sh
JWT_SECRET="add jtw secret"
SERVICE_PORT="add service port"

DB_USER="add database user"
DB_PSWD="add database password"
DB_HOSTNAME="add database hostname"
DB_PORT="add database port"
DB_NAME="add database name"
DB_DIALECT="add database dialect"
```

Create database and call it
```sh
rentalmovies
```
or throw
```sh
npx sequelize-cli db:create
```

### 2. Populate the database
Two ways:
***

##### 2.1 Migrations
Rename config/**example.config.json** to **config.json** and and modify it with your settings
```sh
{
  "development": {
    "username": "db username",
    "password": "db password",
    "database": "db database",
    "host": "db host",
    "dialect": "db dialect",
    "port": "db port"
  }
}
```
Launch the migrations
```sh
npx sequelize-cli db:migrate
```
***
or
***
##### 2.2 Sequelize models
Go to **index.js** and change sequelize.authenticate() to

```sh
sequelize.sync()
```
_Remember to change it back if you want to keep the changes_
***
##### 2.3 Seeders
If you want to have mocked data you can use

```sh
npx sequelize-cli db:seed:all
```

# Test the app 

In the **test** folder you will find test files as a client
- auth.test.http
- movies.test.http
- series.test.http
- rentals.test.http
***
# EER Diagram
![direct_movies_2](https://user-images.githubusercontent.com/96445737/206137482-a6fa3b24-37d3-4df0-82f2-934ab1089a3b.png)

# History
_This full stack project is part of an evolutionary collaborative project, if you want to see the original repositories visit the links:_
- My original API [link](https://nodejs.org/)
- Our team API [link](https://nodejs.org/)
- Reactjs [link](https://nodejs.org/)


# License

MIT


# Authors
- Héctor González - @hectorgv00
- Diego Waisrub - @di3lux
- Fernando Valdivielso - @valdidev

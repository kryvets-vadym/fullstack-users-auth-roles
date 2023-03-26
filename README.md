# Full-Stack App for User Authentication and Users List Display Based on Role

---
> Here is [DEMO](https://fullstack-users-auth-roles-pyiz.vercel.app/)

This project allows users to authenticate and obtain a list of users 
based on their role. There are four possible roles: USER, ADMIN, PAIRED,
and UNPAIRED. The USER role does not have access to user list functionality,
while the ADMIN role has access to all users. The PAIRED role has access to 
users with paired user IDs, while the UNPAIRED role has access to users with 
unpaired user IDs.


## Sample data for testing

---

1. To log in as a default user | USER Role
```json
{   
    email: "mr.user@gmail.com",
    password: "mrUser123"
}

```
2. To log in as administrator user | ADMIN Role
```json
{   
    email: "mr.admin@gmail.com",
    password: "mrAdmin123"
}
```

3. To authorize and get paired users | PAIRED Role
```json
{   
    email: "mr.paired@gmail.com",
    password: "mrPaired123"
}
```

4. To authorize and get unpaired users | UNPAIRED Role
```json
{   
    email: "mr.unpaired@gmail.com",
    password: "mrUnpaired123"
}
```

## Technologies Used

---

The project was implemented using the following technologies:

* Typescript
* Node.js
* Express.js
* React.js
* MongoDB
* Mongoose
* JSON Web Tokens (JWT)
* BULMA


## Getting Started

---

To get started with the project, follow these steps:

1. Clone the repository to your local machine.

```
git clone https://github.com/kryvets-vadym/fullstack-users-auth-roles.git
```

2. Navigate to the project folder:

```bash
cd fullstack-users-auth-roles
```

3. Install the dependencies by running the following command:

```bash
npm run install-dependencies
```

4. Start the web server by running the following command:
```bash
npm run start-server
```

4. Start the client by running the following command:
```bash
npm run start-client
```

## Local Setup

To setup the API locally, you will need to create a `.env` file and populate 
it with the following values:

Server:
```xml
SECRET=<secret>
DB_URL=<database_connection_url>
PORT=<port_value>
JWT_ACCESS_SECRET=<access_secret_key>
JWT_REFRESH_SECRET=<refresh_secret_key>

SMTP_HOST=<smtp_host>
SMTP_PORT=<smtp_port>
SMTP_USER=<smtp_user_email>
SMTP_PASSWORD=<smtp_user_password>

API_URL=<link_on_this_api>
CLIENT_URL=<client_url>
```

Client:
```xml
REACT_APP_API_URL=<link_to_the_current_api>
```

## Available Routes

#### **POST** `/api/registration`
* Used for signing up a user. Accepts `username`, `email`, `password`,
  `role` (optional, using the Postman, default: `USER`) to create a user.
* Returns a `accessToken`, `refreshToken` and `user data`.

#### **POST** `/api/login`
* Used for logging a user in. Accepts `email` and `password` to authenticate a user.
* Returns a `accessToken`, `refreshToken` and `user data`.

#### **GET** `/api/activate/:link`
* A link of this type is emailed to the user. When the users click this link,
  they confirm their email and successfully register with the app. The `:link` is generated using the `uuid` library.

#### **POST** `/api/logout`
* Used for logout a user.

#### **GET** `/api/refresh`
* Here the tokens may have a validity period so after the period the `token` expires
  and the user has to again generate the `token` as in login again but with the help of
  `refresh token`, we can regenerate the `accessToken` using `refreshToken` without actually
  logging in.

#### **GET** `/api/users`
* Closed access for users with the `USER` role.
* Returns all users in the database. Requires a valid JWT with an `ADMIN` role.
* Returns users with paired id numbers. Requires a valid JWT with an `PAIRED` role.
* Returns users with unpaired id numbers. Requires a valid JWT with an `UNPAIRED` role.


## What's included

Within the download you'll find the following working directories and files:

```
- server/
  ├── src/
  │   ├── controllers
  │   │   ├── authController.ts
  │   │   └── usersController.ts  
  │   ├── exceptions
  │   │   └── apiError.ts    
  │   ├── helpers/
  │   │   ├── catchErrors.ts
  │   │   └── registerValidation.ts   
  │   ├── middlewares/
  │   │   ├── authMiddleware.ts
  │   │   ├── checkRoleMiddleware.ts
  │   │   └── errorMiddleware.ts    
  │   ├── models/
  │   │   ├── Token.ts
  │   │   ├── User.ts
  │   │   └── UserItem.ts  
  │   ├── routes/
  │   │   ├── authRouter.ts
  │   │   └── usersRouter.ts
  │   ├── services/
  │   │   ├── authService.ts
  │   │   ├── mailService.ts
  │   │   ├── tokenService.ts
  │   │   └── userService.ts 
  │   ├── types/
  │   │   ├── Action.ts
  │   │   ├── RequestData.ts
  │   │   ├── UserRoles.ts
  │   │   └── UserToReturn.ts
  │   ├── db.ts
  │   └── server.ts
  ├── .eslintrc
  ├── .prettierrc
  ├── vercel.json
  ├── nodemon.json
  ├── package.json
  ├── package-lock.json
  ├── README.md
  └── tsconfig.json
```

## Future Improvements

---

Here are some potential improvements that could be made to the project:

* Implement pagination for the list of users to improve performance when the number of users grows.
* Add the ability for administrators to edit and delete user information, and to create new user accounts.
* Integrate with a third-party authentication service, such as Google or Facebook, to allow users to sign in with their existing social media accounts.
* Improve the user interface to make it more intuitive and user-friendly.
* Add more advanced search functionality to allow users to search for specific users based on various criteria.
* Implement automated testing to ensure the application is functioning correctly and to prevent regressions in functionality.
* Add support for additional languages to make the application accessible to users who don't speak English as their first language.
* Implement a more robust error handling and logging system to aid in troubleshooting and debugging issues.
* Integrate with additional third-party services, such as a payment processor or email marketing service, to expand the application's functionality.

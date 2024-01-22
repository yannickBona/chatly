# Chatly

_Chatly_ is a simple Web Application where you can share your thoughts and interact with anyone in real time.

## About

This repository contains a full-stack web application built from scratch using React.js and Node.js with TypeScript. The application incorporates several important concepts and technologies to deliver a robust and secure user experience.

## Key Features

The project includes the following key features, all developed from scratch:

- **JWT Authentication**: Implements a secure authentication system using JSON Web Tokens (JWT) with session token refresh functionality: each JWT is signed by the Server with its own secret and stored on the user's localStorage, expiring every 7 days. A refreshToken HTTP Only cookie (expires every 30d and signed with a different secret) is also stored on the user's browser and is used to generate a new accessToken automatically every 7 days;
- **Enhanced Password Encryption**: Utilizes a robust hashing algorithm in conjunction with SALTS to ensure the secure storage of passwords in the database.
- **Node.js**: Utilizes various Node.js features such as routing, middlewares, Mongoose, Express, and TypeScript for server-side development;
- **NoSQL**: Integrates NoSQL databases, specifically MongoDB, to handle data storage and retrieval efficiently;
- **DB Schemas Migrations**: handling MongoDB schema migrations to keep all documents up to date;
- **RESTful API**: Implements a RESTful API architecture for seamless communication between the frontend and backend;
- **React.js**: Utilizes React.js with Vite and TypeScript for building the user interface, incorporating routing, context management, JWT authentication, and state management.

## Tech Stack

The project leverages the following technologies:
- React.js;
- Node.js + Express.js;
- Typescript
- MongoDB;

## Getting Started

To run the project locally, follow the steps below:

- Clone the repository: `git clone https://github.com/yannickBona/chatly.git`

- Install the required dependencies:
  - For the client, navigate to the /client directory and run `npm install`;
  - For the server, navigate to the /server directory and run `npm install`;
- Configure the environment variables: Create a .env file in both /server & /client directories and set the necessary variables as displayed in the **.env.sample** file.

- Start the development server:
  - For the frontend, navigate to the /client directory and run npm run dev.
  - For the backend, navigate to the /server directory and run npm run dev.
- Access the application by opening http://localhost:<your_port> in your web browser.

## Contact

For any inquiries or suggestions, please reach out to _yannick.bonavoglia13@gmail.com_.

**_Feel free to provide feedback or suggestions!_**

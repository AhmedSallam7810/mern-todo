# MERN Todo App

A simple full-stack TODO application built with MongoDB, Express, React & Node.js.

## Repository

https://github.com/your-github-username/mern-todo

## Prerequisites

- Node.js v14+
- npm or yarn
- MongoDB (local or Atlas)

## Setup

1. Clone repository
   ```bash
   git clone https://github.com/your-github-username/mern-todo.git
   cd mern-todo
   ```

2. Create environment file in `api/`
   ```bash
   cp api/.env.example api/.env
   ```
   Fill in the following in `api/.env`:
   ```env
   MONGO_URI=<your MongoDB connection string>
   PORT=5000
   ```

## Install Dependencies

### Back-end (API)
```bash
cd api
npm install
```

### Front-end (Client)
```bash
cd todo
npm install
```

## Running the Application

1. Start the API server:
   ```bash
   cd api
   npm start
   ```
   _Runs on http://localhost:5000_

2. Start the React client:
   ```bash
   cd todo
   npm start
   ```
   _Runs on http://localhost:3000_

Your browser should open automatically. If not, visit http://localhost:3000.

## Tech Stack

- Node.js
- MongoDB
- Mongoose
- Express.js
- Joi
- jsonwebtoken
- bcrypt
- cors
- dotenv
- react
- react-dom
- react-redux
- react-router-dom
- redux
- redux-persist

## Notes

- Modify `proxy` in `todo/package.json` if using a different API port.
- For production build, run `npm run build` in the `todo` folder.
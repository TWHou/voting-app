# Voting-App

This project is part of the FreeCodeCamp Back End Development Certification.

[Build a Voting App](https://www.freecodecamp.com/challenges/build-a-voting-app)

## User Stories
- As an authenticated user, I can keep my polls and come back later to access them.
- As an authenticated user, I can share my polls with my friends.
- As an authenticated user, I can delete polls that I decide I don't want anymore.
- As an authenticated user, I can create a poll with any number of possible items.
- As an unauthenticated or authenticated user, I can see and vote on everyone's polls.
- As an unauthenticated or authenticated user, I can see the results of polls in chart form.
- As an authenticated user, if I don't like the options on a poll, I can create a new option.

## Prerequisites
- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)
- [MongoDB](https://www.mongodb.com/)

## Local Development

### Setup `.env` file
Create a `.env` file inside the `server` folder.

Add environment-specific variables on new lines in the form of `NAME=VALUE`.

```
MONGO_URI=<YOUR_DATABASE_URI>
SECRET=<YOUR_SECRET_KEY>
```

### Run the API Server

In a terminal:

```bash
# Initial setup
npm install

# Start the server
npm start
```

### Run the React UI

The React app is configured to proxy backend requests to the local Node server.

In a separate terminal from the API server, start the UI:

```bash
# Always change directory, first
cd react-ui/

# Initial setup
npm install

# Start the server
npm start
```

## Resources
- [React](https://facebook.github.io/react/)
- [React Router](https://github.com/ReactTraining/react-router)
- [Express](https://expressjs.com/)
- [Mongoose](http://mongoosejs.com/docs/api.html)
- [Passport](http://passportjs.org/docs)
- [heroku-cra-node](https://github.com/mars/heroku-cra-node)
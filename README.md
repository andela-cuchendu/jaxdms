# JaxDms - Jax Document Management System

[![N|Solid](https://cdn.movemeback.com/companies/b61896af09dc4797._small.png?cbust=ChangeMeIfWantToResetImageCaching)](https://andela.com)


[![Test Coverage](https://codeclimate.com/github/andela-cuchendu/jaxdms/badges/coverage.svg)](https://codeclimate.com/github/andela-cuchendu/jaxdms/coverage)
[![Code Climate](https://codeclimate.com/github/andela-cuchendu/jaxdms/badges/gpa.svg)](https://codeclimate.com/github/codeclimate/codeclimate)
[![Build Status](https://travis-ci.org/andela-cuchendu/jaxdms.svg?branch=develop)](https://travis-ci.org/andela-cuchendu/jaxdms)

Jaxdms is your best electronic filing cabinets that provide a framework for organizing all documents applying access roles as to who views your document

Jaxdms is a fullstack application which helps users create and manage documents, and the same time, set who can view or access the document.

View the app live [here](https://jaxdms.herokuapp.com/)

## API Documentation

## Users

EndPoint | Functionality
-------- | -------------
POST /users/login | Logs a user in.
POST /users/logout | Logs out a user.
POST /users/ | Creates a new user.
GET /users/ | Find matching instances of user.
GET /users/?limit={integer}&offset={integer} | Pagination
GET /users/<id> | Find user with the id.
PUT /users/<id> | Update user attributes with id.
DELETE /users/<id> | Deletes a user.
GET /search/users/?q={} | Search for a user.

## Documents

EndPoint | Functionality
-------- | -------------
POST /documents/ | Creates a new document.
GET /documents/ | Gets list of documents.
GET /documents/?limit={integer}&offset={integer} | Pagination
GET /documents/<id> | Finds a document with id.
PUT /documents/<id> | Updates document attributes with id.
DELETE /documents/<id> | Deletes a document with id.
GET /users/<id>/documents | Find all documents belonging to the user.
GET /search/documents/?q={doctitle} | Search for a doc.

## Roles

EndPoint | Functionality
-------- | -------------
GET /roles/ | List all roles.

## More documentation
[API DOCUMENTATION](https://jaxdms.herokuapp.com/dms)

### Features
  - Create and manage Documents.
  - Admin creates and manages users. 
  - Decided who views your document
  - Edit document
  - Formatted documents

## Getting Started

#### Via Cloning The Repository:

```
# Get the app locally
git clone https://github.com/andela-cuchendu/jaxdms.git

# Change directory
cd jaxdms

# Create .env file in the root directory
touch .env

# Copy .env.example to .env and edit with your parameters

# add your SECRET, PORT, DATABASE_URL, and TEST_DATABASE_URL keys

# Install Package dependencies
npm install

# Run your migrations
npm run migrate

# Run your migrations
npm run seedData

# Run the application
npm start

# Run end to end test
npm run e2e-setup

# Run end to end test
npm run test-e2e
```
### Limitations:

The limitations 0f this application includes:

Users can only create textual documents and retrieve same when needed.
Users cannot share documents with people, but can make document public to make it available to other users in the application.
Real file types are not supportd
Roles cannot be added

### Contributing

If you are interested in contributing to development of Jaxdms,

Follow the instructions below to contribute.

- Fork the repository

- Make your change

- Commit your change to your forked repository 

- Provide a detailed commit description 

- Create a pull request

NOTE: Be sure to merge the latest from "upstream" before making a pull request! Airbnb style guide is the standard for this project. Follow the commit guidline below: 

## Git Commit Guidelines

We have very precise rules over how our git commit messages can be formatted.  This leads to **more
readable messages** that are easy to follow when looking through the **project history**.  

The commit message formatting can be added using a typical git workflow or through the use of a CLI
wizard ([Commitizen](https://github.com/commitizen/cz-cli)). To use the wizard, run `yarn run commit`
in your terminal after staging your changes in git.

## Commit Message Format
Each commit message consists of a **header**, a **body** and a **footer**.  The header has a special
format that includes a **type**, a **scope** and a **subject**:

```
<type>(<scope>): <subject>
<BLANK LINE>
<body>
<BLANK LINE>
<footer>
```

The **header** is mandatory and the **scope** of the header is optional.

Any line of the commit message cannot be longer 100 characters! This allows the message to be easier
to read on GitHub as well as in various git tools.

### License

This project was created by Chibueze Uchendu and is licensed for personal use, modification and distribution is under the MIT license, see [License File](/License) for more information. Feel free to share it!
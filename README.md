# To Do Application Frontend
An application that contains a list of users and user tasks attached to each user.

## Project Structure

The project structure follows the **MVC** (Model-View-Controller) pattern.
```
├── src
│   ├── components
│   │   └── Tasks
│   │   │     └── CreateTask.jsx
│   │   │     └── EditTask.jsx
│   │   │     └── UserTasks.jsx
│   │   └── Users
│   │   │     └── CreateUsers.jsx
│   │   │     └── EditUsers.jsx
│   │   │     └── Users.jsx
│   │   └── Home.jsx
│   ├── routes
│   │     └── index.js
│   ├── services
│   │   └── index.js
│   │   └── UserAPI.js
│   │   └── UserTasksAPI.js
│   ├── index.js
│   ├── App.css
│   ├── App.test.js
│   ├── history.js
│   ├── index.css
│   ├── logo.svg
│   ├── serviceWorker.js
│   ├── setupTests.js
│   ├── utils
```

## Requirements

* React.js
* yarn

## Getting Started

```
$ git clone https://github.com/obulaworld/to-do-app-frontend.git
$ cd to-do-app-frontend
$ yarn install
$ yarn start                 # For development purpose
```

You should now be able to access the API via http://localhost:port/

**NOTE:** Create a `.env` file configuration following the `.env.sample`.

## Project Details
`users:`
 - create a user
 - get all users
 - update a user
 - delete a user

 `userTasks:`
 - create a user task
 - get all user's tasks
 - update a user task
 - delete a user task

## Routes

<table>
<tr><th>HTTP VERB</th><th>ENDPOINTS</th><th>DESCRIPTION</th><th>QUERY</th></tr>
<tr><td>GET</td><td>/users</td><td>List all users</td><td></td></tr>
<tr><td>GET</td><td>/user/create</td><td>Create a user</td><td></td></tr>
<tr><td>GET</td><td>/user/edit/:id/:name</td><td>Update a user</td><td></td></tr>

<tr><td>GET</td><td>/tasks/:userId</td><td>List all user's tasks</td><td></td></tr>
<tr><td>GET</td><td>/task/create</td><td>Creates user task</td><td></td></tr>
<tr><td>GET</td><td>/task/edit/:userId/:taskId</td><td>Updates a user task</td><td></td></tr>

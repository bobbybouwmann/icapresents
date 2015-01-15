# API-Documentation

All api calls return json

## Users

#### Get a list of users
Get all the users from the database.
###### HTTP REQUEST
`GET http://localhost:3000/api/users`

#### Get a single user
Get a user based on the id provided in the request url
###### HTTP REQUEST
`GET http://localhost:3000/api/users/id`

Parameters | Description
--- | ---
id | The id of the user

#### Update a single user
Update a user based on the id provided in the request url and the data provided in the request.
###### HTTP REQUEST
`PUT http://localhost:3000/api/users/id`

Parameters | Description
--- | ---
id | The id of the user

#### Delete a single user
Delete a user based on the id provided in the request.
###### HTTP REQUEST
`DELETE http://localhost:3000/api/users/id`

Parameters | Description
--- | ---
id | The id of the user

#### Get the number of users
Count the number of users in the database.
###### HTTP REQUEST
`GET http://localhost:3000/api/countUsers`

#### Register the user
Sign the user up based on their input using Passport.
###### HTTP REQUEST
`POST http://localhost:3000/signup`

#### Log the user in
Log the user in based on their input (email and password) using Passport.
###### HTTP REQUEST
`POST http://localhost:3000/login`

#### Log the user out
Log the current user out using password.
###### HTTP REQUEST
`POST http://localhost:3000/logout`

#### Check if user is logged in
Check if the current user is logged in. If so return the user else return 0.
###### HTTP REQUEST
`GET http://localhost:3000/loggedin`

#### Check if user is logged in as admin
Check if the current user is logged in and if he/she has an admin role. 
###### HTTP REQUEST
`GET http://localhost:3000/loggedinadmin`

#### Get current user data
Get the userdata of the current logged in user.
###### HTTP REQUEST
`GET http://localhost:3000/api/userData`

---

## Projects

#### Get a list of projects
Get all the projects from the database.
###### HTTP REQUEST
`GET http://localhost:3000/api/projects`

#### Create a project
Create a project based on the data provided in the request and save it in the database.
###### HTTP REQUEST
`POST http://localhost:3000/api/projects`

#### Get a single project
Get a project based on the id provided in the request url
###### HTTP REQUEST
`GET http://localhost:3000/api/projects/id`

Parameters | Description
--- | ---
id | The id of the project

#### Update a single project
Update a project based on the id provided in the request url and the data provided in the request.Get a project based on the id provided in the request url
###### HTTP REQUEST
`PUT http://localhost:3000/api/projects/id`

Parameters | Description
--- | ---
id | The id of the project

#### Delete a single project
Delete a project based on the id provided in the request.
###### HTTP REQUEST
`DELETE http://localhost:3000/api/projects/id`

Parameters | Description
--- | ---
id | The id of the project

#### Vote for a project
Increase the vote of a project based on the id provided in the request.
###### HTTP REQUEST
`POST http://localhost:3000/api/projects/votes/id`

Parameters | Description
--- | ---
id | The id of the project

---

## Profiles

#### Get a list of profiles
Get all the profiles from the database.
###### HTTP REQUEST
`GET http://localhost:3000/api/profiles`

#### Create a profile
Create a profile based on the data provided in the request and save it in the database.
###### HTTP REQUEST
`POST http://localhost:3000/api/profiles`

#### Get a single profile
Get a profile based on the id provided in the request url
###### HTTP REQUEST
`GET http://localhost:3000/api/profiles/id`

Parameters | Description
--- | ---
id | The id of the profile

#### Update a single profile
Update a profile based on the id provided in the request url and the data provided in the request.Get a profile based on the id provided in the request url
###### HTTP REQUEST
`PUT http://localhost:3000/api/profiles/id`

Parameters | Description
--- | ---
id | The id of the profile

#### Delete a single profile
Delete a profile based on the id provided in the request.
###### HTTP REQUEST
`DELETE http://localhost:3000/api/profiles/id`

Parameters | Description
--- | ---
id | The id of the profile

---

## Semesters

#### Get a list of semesters
Get all the semesters from the database.
###### HTTP REQUEST
`GET http://localhost:3000/api/semesters`

#### Create a semester
Create a semester based on the data provided in the request and save it in the database.
###### HTTP REQUEST
`POST http://localhost:3000/api/semesters`

#### Get a single semester
Get a semester based on the id provided in the request url
###### HTTP REQUEST
`GET http://localhost:3000/api/semesters/id`

Parameters | Description
--- | ---
id | The id of the semester

#### Update a single semester
Update a semester based on the id provided in the request url and the data provided in the request.Get a semester based on the id provided in the request url
###### HTTP REQUEST
`PUT http://localhost:3000/api/semesters/id`

Parameters | Description
--- | ---
id | The id of the semester

#### Delete a single semester
Delete a semester based on the id provided in the request.
###### HTTP REQUEST
`DELETE http://localhost:3000/api/semesters/id`

Parameters | Description
--- | ---
id | The id of the semester

#### Get semesters connected to profiles
Get the semesters connected to the profile based on the profile id provided in the request url.
###### HTTP REQUEST
`GET http://localhost:3000/api/profilesemesters/id`

Parameters | Description
--- | ---
id | The id of the profile

---

## Images

#### Upload an image
Upload an image using a multipart form
#### HTTP REQUEST
`POST http://localhost:3000/upload`

---

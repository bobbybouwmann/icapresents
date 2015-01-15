# API-Documentation

## Projects

#### Get all projects
Get all the projects from the database.
###### HTTP REQUEST
`GET http://localhost:3000/api/projects`

***

#### Create a project
Create a project based on the data provided in the request and save it in the database.
###### HTTP REQUEST
`POST http://localhost:3000/api/projects`

***

#### Get a single project
Get a project based on the id provided in the request url
###### HTTP REQUEST
`GET http://localhost:3000/api/projects/id`
Parameters | Description
--- | ---
id | The id of the project

***

#### Update a single project
Update a project based on the id provided in the request url and the data provided in the request.Get a project based on the id provided in the request url
###### HTTP REQUEST
`PUT http://localhost:3000/api/projects/id`
Parameters | Description
--- | ---
id | The id of the project

***

#### Delete a single project
Delete a project based on the id provided in the request.
###### HTTP REQUEST
`DELETE http://localhost:3000/api/projects/id`
Parameters | Description
--- | ---
id | The id of the project

***

#### Vote for a project
Increase the vote of a project based on the id provided in the request.
###### HTTP REQUEST
`POST http://localhost:3000/api/projects/votes/id`
Parameters | Description
--- | ---
id | The id of the project

***

## Profiles

## Semesters

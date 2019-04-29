# React with RESTful and GraphQL API's

View site here: https://4790-final.netlify.com/

The RESTful API is deployed [here](https://restful-crud-node-server.herokuapp.com/), no need to set it up on your own machine. (If you really want to, [here is the repo](https://github.com/BenDixon311/RESTful-CRUD-Node-Server))

## Docker

Docker is required to run the local postgres database and prisma server.

Docker allows you to bring up limited virtual machines and run only services in them. For more info visit [https://www.docker.com/](https://www.docker.com/)

<details>
    <summary><strong>I don't have Docker installed on my machine</strong></summary>

To install docker follow the link that works for you:

[Docker for Mac](https://docs.docker.com/docker-for-mac/install/)

[Docker for Windows](https://docs.docker.com/docker-for-windows/install/)

</details>

## Setting up the Docker server for GraphQL pages

First, clone the server repo (https://github.com/BenDixon311/Portfolio-Backend.git)

While in the project directory, open a terminal and run

 `yarn install`
 
 To start docker, run
 
 `yarn dockerStart`
 
 start the server by running 
 
 `yarn start`
 
 To deploy the Prisma API run
 
 `prisma deploy`
 
 seed the database by running
 
 `yarn seed`
 
 # REST API
 #### 3 GET queries
 
  1. Get all players
  2. Get one player by name
  3. Get players by team name
  
 #### POST
 
  1. Create a player
  
 #### PUT

  1. Update player details
 
 #### DELETE
  1. Delete player
  
# GraphQL API
#### 3 Queries
  1. Get all projects
  2. Get one project by ID
  3. Get project by development type
#### 3 Mutations
  1. Create Project
  2. Update Project
  3. Delete Project
 
 

 

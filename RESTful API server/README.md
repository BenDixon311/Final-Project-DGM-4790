# Ben's NBA Roster Updater
## Deployed on Heroku - https://restful-crud-node-server.herokuapp.com/

## Data Structure:
  `
  {
    "name": String,
    "number": Number,
    "team": String,
    "position": String
  }`
  
# Endpoints 
## Use Postman ( https://www.getpostman.com/ ) to use CRUD features
### GET All Players
  - Use `/` to view all players
  
 ### GET One Player by name
  - Use `/:name` to GET one player
  
 ### GET Players by Team Name
  - Use `/:team` to GET all players by Team Name
  
 ### POST player
  - use `/create` to create a new player 
  - *see above data structure for json syntax
  
 ### UPDATE player
  - use `/update/:id` to update player info
  
 ### DELETE player
  - use `/delete/:id` to delete player data
  
 


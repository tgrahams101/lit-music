# Spotify LIT & SongWiz

See what tunes have caught fire. Check out Spotify LIT!

Want to see analysis by artificial intelligence of your favorite songs? Check out SongWiz!

## Tech Stack
- **Front End for Spotify LIT:** Angular 6 
- **Front End for SongWiz:** React 
- **Core Back End** Java (Spring), within microservice system, using Netflix's open-sourced microservice libraries (Zuul API Gateway && Eureka Service Registry)
- **Supplementary Back End** Node.js server that manages Spotify API token retrieval and interaction with Spotify's server-side Oauth authentication scheme

## Test Coverage
- **End-to-End Testing:** Selenium, using Selenide  
- **Unit Testing:** Jasmine/Karma  


## Features
- Spotify LIT: user can favorite songs
- Spotify LIT: user can thumbs up/like songs 
- Spotify LIT: user can search Spotify library for songs to listen to
- SongWiz: user can choose a song on which to perform analysis (using IBM Watson for Natural language analysis)
 

## How to start on local machine
- docker-compose up to start back-end from root folder
- To start Spotify LIT, cd into front-end folder from root and then run 'npm start'
- To start SongWiz, cd into songwiz-front-end folder from root and then run 'npm run start'


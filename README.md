## Twitch Clone Chat App

Introduction

A Gaming Chat App similar to Twitch(for all those gamers out there!) :video_game:

This is a FullStack Application


Tech Stack
- Javascript
- React
- Node.js
- Express
- getStream.io 

Getting Started on this project
- https://app.diagrams.net/#G1DupV7IRlUQcmNR9oePdsmLgGJUp9lav2
![This is an image](https://github.com/SDePaula97/Chat-App/blob/main/trello%20board.png)

Sign up to getstream.io
You need to sign up to getstream.io to get your secret, your key and your id.

Go into the client directory in your terminal

We will need to install the packages neccesary to run the frontend.
```
npm i
```
For this project I used:
```
stream-chat-react
axios
react-cookie
react-player
react-icons
```

Install all the packages you need by running the command in your terminal.
```
npm run start:frontend
```
Runs the app in the development mode.
Open http://localhost:3000 to view it in the browser.

Go into the server directory
In a new tab in the terminal, go into the server directory. We will need to install the packages neccesary to run the backend.
For the backend I used:
```
npm i

bcrypt
cors
dotenv
express
getstream
nodemon
stream-chat
uuid
```
```
npm run start:backend
```
This will start the server on http://localhost:8000.

The page will reload if you make edits.
You will also see any lint errors in the console.

Create a .env file with the following code and your personal keys, secrets and ids, in the root of your project.
```
API_KEY={your_key}

API_SECRET={your_secret}

APP_ID={your_id}
```


##Unresolved Issues

##Future Enhancements

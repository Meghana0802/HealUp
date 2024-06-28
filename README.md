# HealUp Website

This website educates users on various mental health issues and provides a platform where they can discuss any queries related to these issues. The website is built using React for the frontend and Express.js with MongoDB for the backend, featuring JWT authentication.

## Getting started

To run this application locally on your machine, follow these steps:

1. Install Node.js and npm on your machine.

2. Clone this repository to your local machine using the following command:
```bash
git clone https://github.com/Meghana0802/HealUp.git
```

3.Navigate to the project directory.

4.Install the required dependencies for both frontend and backend:
* For the frontend, navigate to the client directory and install dependencies:
 ```bash
cd client
npm install axios react-router-dom react-bootstrap fontawesome
```

* For the backend, navigate to the server directory and install dependencies:
 ```bash
 cd server
npm install express mongoose dotenv bcryptjs jsonwebtoken cors
npm install --save-dev nodemon
```

5.Create a .env file in the server directory and add your environment variables like this:

 ```plaintext
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
PORT=5000
```

6.Start the development server:

* Start the backend server:
 ```bash
 cd server
nodemon server.js
```

* Starte the frontend server:
 ```bash
 cd client
npm start
```

## Usage

1.Navigate to http://localhost:3000 to view the application.

2.Register with required credentials and then login.

3.Use the navigation bar to switch between the Resources, Journal, and Forum pages.

4.In the Resources page, click on the resource buttons to view and study about them. These resources are curated from various sources on the internet.

5.The Journal page allows users to create, update, and delete journal entries. The calendar on the page displays entries for specific dates.

6.The Forum page includes a sidebar with navigation buttons and a discussion section for posts and comments. Users can select a topic from the sidebar to view related discussions, and they can also post and comment.
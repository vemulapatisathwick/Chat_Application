# Chat_Application
















Description: Real-Time Chat Application
This project is a real-time chat application backend, built with Node.js. It includes a lightweight database and server logic to manage chat functionality.

📁 Key Files and Folders
server.js
Main entry point for the server. It likely handles HTTP and WebSocket connections for real-time messaging.

db.js
Manages database interactions, likely with the included SQLite database.

chat.db
A pre-built SQLite database file that stores chat messages and/or user data.

package.json
Lists the project’s dependencies. Used by npm to install and run the app.

node_modules/
Contains installed Node.js packages (e.g., WebSocket libraries, database drivers).

▶️ How to Run the Chat App
Open a terminal in the extracted chat-app folder

Run the following commands:

bash
Copy
Edit
npm install        # installs dependencies
node server.js     # starts the server
Open your browser and go to http://localhost:3000 or whatever port the server uses.

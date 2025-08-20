# CollabDo
collaborative to-dos.
## How to Run
* step 1: download from git repo
* step 2: npm install
* step 3: .env file creating (example model):
* PORT='3000'
* JWT_SECRET_KEY='secretkey'
* SIB_API_KEY ='hlkasdfjlkasdfjhalksdfjhlaksdfjaklsdfhjaklsdfjhlkasdfhjkl'

* WEBSITE="http://localhost:3000"
* DATABASE_NAME='todo'
* DATABASE_USERNAME='root'
* DATABASE_PASSWORD='*******'
* DATABASE_DIALECT='mysql'
* DATABASE_HOST='localhost'"""

* step 4: npm start
* step 5: url to start the web application eg: http://localhost:3000(port number)/

## Functionality:
User Registration and Login: Implemented user registration with a username and password. Implemented secure password hashing.
## CollabDo features:
* Implement role-based access control, where users can only edit their own lists and tasks.
* Integrated a third-party API for additional features (email based forget password recovery)
* New to-do lists with a title and description.
* Add new tasks to their lists, including a description.
* Able to mark tasks as completed.
* Able to delete tasks and lists.
* Instant sharing of to do task using web socket.
## Database Interaction:
* Stored user information (username, hashed password) securely in a database.
* Stored to-do lists and tasks in the database, associatted them with the respective user.


This repository is for Part 13 of Full Stack Open (FSO), "Using Relational Databases" - https://fullstackopen.com/en/part13

This part of FSO focuses on using using PostreSQL and sequelize in a backend web application using NodeJS. The app is similar to the backend of the bloglist application developed in part 4 of FSO, and in my repository FSO_04. It is intended to be compatable with the front end developed in part 5 of FSO, and in my repository FSO_05.

This project relies on connecting to a Postgres server on Fly.io for the database.

The the project that handles the following calls in the following manners:
* GET /api/blogs - returns all blogs in database, populating the userName and name of the user who added the blog; response is sorted in descending order of total likes
* POST /api/blogs - if a valid token and a valid blog entry are included in the request, adds the blog to the database; otherwise returns an error
* DELTE /api/blogs/:id - if the id matches a blog and if a valid token is in the request with a user that matches the user who added the blog, deletes the blog from the database; otherwise returns 404 or 401 respectively
* PUT /api/blogs/:id - if the id matches a blog and if the request contains a "likes" field, updates the blog likes number; otherwise returns 404 or 400, respectively

* GET /api/users/ - returns all users in database, populating the blog arrays with the blog's url, title, and author
* GET /api/users/:id - returns user info matching id, including their reading list; otherwise returns 404
* POST /api/users/ - if the request includes the necessary username and password field, adds a new user to the database with a password hash; otherwise throws an error
* PUT /api/users/:username - if a username matches 'username' and the request contains a proper username field, updates the user's username; otherwise throws an error

* POST /api/login/ - if the request contains a valid username and password returns a credential token; otherwise returns 401

* DELETE /api/logout/ - if the request contains a username of a logged in user, destroys that user's credential token; otherwise returns an appropriate error

* GET /api/authors/ - returns a list of authors, with total number of blogs and total number of likes, sorted in descending order of total likes

* POST /api/readinglists/ - if the request includes the ids of a user and a blog, adds the blog to the user's reading list; otherwise returns an error
* PUT /api/readinglists/:id - if the id matches a reading list and the header includes a token that matches the userid of the reading list, changes the reading list status from unread to read; otherwise throws an appropriate error


Exercises in this section cover the use of relational databases for backend development in NodeJS using sequelize. It includes setting up a remote PostgreSQL database; creating models for database tables; automatically generating tables; user administration; connecting database tables; building complex queries with filtering, sorting, and renaming of results; migrations; and many-to-many relationships between tables.

const express = require('express');
const app = express();

const { PORT } = require('./util/config');
const { connectToDatabase } = require('./util/db');
const { errorHandler, tokenExtractor } = require('./util/middleware');

const blogsRouter = require('./controllers/blogs');
const usersRouter = require('./controllers/users');
const loginRouter = require('./controllers/login');
const authorRouter = require('./controllers/authors');
const readingListRouter = require('./controllers/readingLists');

app.use(express.json());
app.use(tokenExtractor);

app.use('/api/blogs', blogsRouter);
app.use('/api/users', usersRouter);
app.use('/api/login', loginRouter);
app.use('/api/authors', authorRouter);
app.use('/api/readinglists', readingListRouter);

app.use(errorHandler);

const start = async () => {
  await connectToDatabase();
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

start();

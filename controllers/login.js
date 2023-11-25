const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const router = require('express').Router();

const { SECRET } = require('../util/config');
const { BloglistUser, BloglistSession } = require('../models/');

router.post('/', async (request, response) => {
  const { username, password } = request.body;

  if (!username || !password) {
    return response.status(401).json({
      error: 'login request must include username and password'
    });
  }

  const user = await BloglistUser.findOne({
    where: {
      username
    }
  });

  const passwordCorrect =
    user === null ? false : await bcrypt.compare(password, user.passwordHash);

  if (!passwordCorrect) {
    return response.status(401).json({
      error: `invalid ${user === null ? 'username' : 'password'}`
    });
  }

  const userForToken = {
    username: user.username,
    id: user.id
  };

  const token = jwt.sign(userForToken, SECRET);

  const sessionToken = await BloglistSession.create({
    token,
    bloglistuserId: user.id
  });

  response
    .status(200)
    .send({ token, username: user.username, name: user.name });
});

module.exports = router;

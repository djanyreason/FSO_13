const router = require('express').Router();

const { BloglistUser, BloglistSession } = require('../models/');

router.delete('/', async (request, response, next) => {
  const { username } = request.body;

  if (!username) {
    return response.status(401).json({
      error: 'login request must include username and password'
    });
  }

  const user = await BloglistUser.findOne({
    where: {
      username
    }
  });

  if (!user) return response.status(401).json({ error: 'invalid username' });

  const sessions = await BloglistSession.scope({
    method: ['user', user.id]
  }).findAll();

  try {
    sessions.map((s) => s.destroy());
  } catch (error) {
    next(error);
  }

  response.status(200).json(`Logged out ${user.username}`);
});

module.exports = router;

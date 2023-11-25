const jwt = require('jsonwebtoken');

const { SECRET } = require('./config');
const { BloglistSession, BloglistUser } = require('../models');

const errorHandler = (error, req, res, next) => {
  if (error) return res.status(400).json({ error: error.message });

  next(error);
};

const tokenExtractor = (request, response, next) => {
  const authorization = request.get('authorization');

  if (authorization && authorization.startsWith('Bearer ')) {
    request.token = authorization.replace('Bearer ', '');
  }

  next();
};

const tokenValidator = async (req, res, next) => {
  if (!req.token)
    return res.status(401).json({ error: 'Request requires valid token' });

  const session = await BloglistSession.findOne({
    where: { token: req.token }
  });
  if (!session) return res.status(401).json({ error: 'Token invalid' });

  try {
    const decodedToken = jwt.decode(req.token, SECRET);
    const user = await BloglistUser.findByPk(decodedToken.id);
    if (user.disabled) return res.status(401).json({ error: 'User disabled' });
    else {
      req.userId = decodedToken.id;
      next();
    }
  } catch (error) {
    return res.status(401).json({ error: 'Malformatted Token' });
  }
};

module.exports = {
  errorHandler,
  tokenExtractor,
  tokenValidator
};

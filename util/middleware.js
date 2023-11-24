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

module.exports = {
  errorHandler,
  tokenExtractor
};

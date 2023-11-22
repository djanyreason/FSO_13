const errorHandler = (error, req, res, next) => {
  if (error) return res.status(400).json({ error: error.message });

  next(error);
};

module.exports = {
  errorHandler
};

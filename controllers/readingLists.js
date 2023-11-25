const router = require('express').Router();
const jwt = require('jsonwebtoken');

const { SECRET } = require('../util/config');
const { ReadingList } = require('../models');

router.post('/', async (req, res, next) => {
  try {
    const { blogId, bloglistuserId } = req.body;
    const readingList = await ReadingList.create({ blogId, bloglistuserId });
    res.json(readingList);
  } catch (error) {
    next(error);
  }
});

router.put('/:id', async (req, res, next) => {
  if (!req.token)
    return res
      .status(401)
      .json({ error: 'User associated with reading list must be logged in' });

  const readingList = await ReadingList.findByPk(req.params.id);
  if (!readingList) return res.status(404).end();

  try {
    const decodedToken = jwt.decode(req.token, SECRET);
    if (decodedToken.id !== readingList.bloglistuserId)
      return res
        .status(401)
        .json({ error: 'User associated with reading list must be logged in' });
  } catch (error) {
    res.status(401).json({ error: 'invalid token' });
    return;
  }

  if (!Object.keys(req.body).includes('read'))
    return res.status(200).json(readingList);

  try {
    readingList.read = req.body.read;
    await readingList.save();
    res.json(readingList);
  } catch (error) {
    next(error);
  }
});

module.exports = router;

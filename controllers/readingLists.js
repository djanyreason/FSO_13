const router = require('express').Router();
const { ReadingList } = require('../models');
const { tokenValidator } = require('../util/middleware');

router.post('/', async (req, res, next) => {
  try {
    const { blogId, bloglistuserId } = req.body;
    const readingList = await ReadingList.create({ blogId, bloglistuserId });
    res.json(readingList);
  } catch (error) {
    next(error);
  }
});

router.put('/:id', tokenValidator, async (req, res, next) => {
  const readingList = await ReadingList.findByPk(req.params.id);
  if (!readingList) return res.status(404).end();

  if (req.userId !== readingList.bloglistuserId)
    return res
      .status(401)
      .json({ error: 'User associated with reading list must be logged in' });

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

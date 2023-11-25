const router = require('express').Router();
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

module.exports = router;

const router = require('express').Router();
const sequelize = require('sequelize');
const { Blog } = require('../models');

router.get('/', async (req, res) => {
  try {
    const authors = await Blog.findAll({
      group: 'author',
      attributes: [
        'author',
        [sequelize.fn('COUNT', sequelize.col('id')), 'articles'],
        [sequelize.fn('SUM', sequelize.col('likes')), 'likes']
      ],
      order: [['likes', 'DESC']]
    });
    res.json(authors);
  } catch (error) {
    return res.send(500).json({ error });
  }
});

module.exports = router;

const router = require('express').Router();
const { Op } = require('sequelize');

const { Blog, BloglistUser } = require('../models');
const { tokenValidator } = require('../util/middleware');

router.get('/', async (req, res) => {
  try {
    let where = {};
    if (req.query.search)
      where = {
        [Op.or]: [
          { title: { [Op.iLike]: `%${req.query.search}%` } },
          { author: { [Op.iLike]: `%${req.query.search}%` } }
        ]
      };
    const blogs = await Blog.findAll({
      attributes: { exclude: ['bloglistuserId'] },
      include: {
        model: BloglistUser,
        attributes: ['name', 'username']
      },
      where,
      order: [['likes', 'DESC']]
    });
    res.json(blogs);
  } catch (error) {
    return res.status(500).json({ error });
  }
});

router.delete('/:id', tokenValidator, async (req, res) => {
  const blog = await Blog.findByPk(req.params.id);
  if (blog) {
    if (req.userId !== blog.bloglistuserId)
      return res
        .status(401)
        .json({ error: 'only the user who added the blog may delete it' });
    await blog.destroy();
    res.json(blog);
  } else {
    res.status(404).end();
  }
});

router.put('/:id', async (req, res, next) => {
  if (!req.body.likes)
    return res.status(400).json({ error: 'malformatted request' });
  const blog = await Blog.findByPk(req.params.id);
  if (blog) {
    blog.likes = req.body.likes;
    try {
      await blog.save();
      res.json(blog);
    } catch (error) {
      next(error);
    }
  } else res.status(404).end();
});

router.post('/', tokenValidator, async (req, res, next) => {
  try {
    const newBlog = { ...req.body, bloglistuserId: req.userId };
    const blog = await Blog.create(newBlog);
    res.json(blog);
  } catch (error) {
    next(error);
  }
});

module.exports = router;

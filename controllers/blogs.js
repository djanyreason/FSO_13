const router = require('express').Router();
const jwt = require('jsonwebtoken');
const { Op } = require('sequelize');
const { SECRET } = require('../util/config');

const { Blog, BloglistUser } = require('../models');

router.get('/', async (req, res) => {
  try {
    const where = {};
    if (req.query.search) where.title = { [Op.iLike]: `%${req.query.search}%` };
    console.log(req.query.search, where);
    const blogs = await Blog.findAll({
      attributes: { exclude: ['bloglistuserId'] },
      include: {
        model: BloglistUser,
        attributes: ['name', 'username']
      },
      where
    });
    res.json(blogs);
  } catch (error) {
    return res.status(500).json({ error });
  }
});

router.delete('/:id', async (req, res) => {
  const blog = await Blog.findByPk(req.params.id);
  if (blog) {
    if (blog.bloglistuserId !== null) {
      if (!req.token)
        return res
          .status(401)
          .json({ error: 'only the user who added the blog may delete it' });
      try {
        const decodedToken = jwt.decode(req.token, SECRET);
        if (decodedToken.id !== blog.bloglistuserId)
          return res
            .status(401)
            .json({ error: 'only the user who added the blog may delete it' });
      } catch (error) {
        res.status(401).json({ error: 'invalid token' });
        return;
      }
    }
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

router.post('/', async (req, res, next) => {
  const { title, author, url } = req.body;
  try {
    const newBlog = { title, author, url };
    if (req.body.likes) newBlog.likes = req.body.likes;
    if (req.token) {
      try {
        const decodedToken = jwt.decode(req.token, SECRET);
        newBlog.bloglistuserId = decodedToken.id;
      } catch (error) {
        res.status(401).json({ error: 'invalid token' });
        return;
      }
    }
    const blog = await Blog.create(newBlog);
    res.json(blog);
  } catch (error) {
    next(error);
  }
});

module.exports = router;

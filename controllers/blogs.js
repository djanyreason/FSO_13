const router = require('express').Router();

const { Blog } = require('../models');

router.get('/', async (req, res) => {
  console.log('here!');
  try {
    const blogs = await Blog.findAll();
    console.log(JSON.stringify(blogs, null, 2));
    res.json(blogs);
  } catch (error) {
    return res.status(500).json({ error });
  }
});

router.delete('/:id', async (req, res) => {
  const blog = await Blog.findByPk(req.params.id);
  if (blog) {
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
  console.log(req.body);
  try {
    const blog = await Blog.create(req.body);
    res.json(blog);
  } catch (error) {
    next(error);
  }
});

module.exports = router;

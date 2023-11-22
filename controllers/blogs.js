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

router.post('/', async (req, res) => {
  console.log(req.body);
  try {
    const blog = await Blog.create(req.body);
    res.json(blog);
  } catch (error) {
    return res.status(400).json({ error });
  }
});

module.exports = router;

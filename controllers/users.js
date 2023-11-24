const router = require('express').Router();
const bcrypt = require('bcrypt');

const { Blog, BloglistUser } = require('../models');

router.get('/', async (req, res) => {
  const users = await BloglistUser.findAll();
  res.json(users);
});

router.post('/', async (req, res, next) => {
  try {
    const { name, username, password } = req.body;
    const passwordHash = await bcrypt.hash(password, 10);
    const user = await BloglistUser.create({ name, username, passwordHash });
    res.json(user);
  } catch (error) {
    next(error);
  }
});

router.put('/:username', async (req, res, next) => {
  try {
    const theUser = await BloglistUser.findOne({
      where: { username: req.params.username }
    });
    theUser.username = req.body.username;
    await theUser.save();
    res.json(theUser);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
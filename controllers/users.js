const router = require('express').Router();
const bcrypt = require('bcrypt');

const { Blog, BloglistUser, ReadingList } = require('../models');

router.get('/:id', async (req, res) => {
  const user = await BloglistUser.findByPk(req.params.id, {
    attributes: { exclude: ['id', 'passwordHash', 'createdAt', 'updatedAt'] },
    include: [
      {
        model: Blog,
        as: 'readings',
        attributes: { exclude: ['createdAt', 'updatedAt', 'bloglistuserId'] },
        through: { attributes: ['read', 'id'] }
      }
    ]
  });
  if (user) {
    res.json(user);
  } else {
    res.status(404).end();
  }
});

router.get('/', async (req, res) => {
  const users = await BloglistUser.findAll({
    include: [
      {
        model: Blog,
        attributes: { exclude: ['bloglistuserId', 'id'] }
      }
    ]
  });
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

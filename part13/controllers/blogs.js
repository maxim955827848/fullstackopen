const router = require('express').Router();
const { Blog, User } = require('../models');

router.get('/', async (req, res) => {
  const blogs = await Blog.findAll({
    include: { model: User, attributes: ['username', 'name'] }
  });
  res.json(blogs);
});

router.post('/', async (req, res) => {
  try {
    const user = await User.findOne();
    const blog = await Blog.create({ ...req.body, userId: user.id });
    res.json(blog);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  const blog = await Blog.findByPk(req.params.id);
  if (blog) {
    await blog.destroy();
    res.status(204).end();
  } else {
    res.status(404).end();
  }
});

module.exports = router;

const Blog = require('./blog');
const BloglistUser = require('./user');

BloglistUser.hasMany(Blog);
Blog.belongsTo(BloglistUser);
Blog.sync({ alter: true });
BloglistUser.sync({ alter: true });

module.exports = {
  Blog,
  BloglistUser
};

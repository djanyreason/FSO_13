const Blog = require('./blog');
const BloglistUser = require('./user');

BloglistUser.hasMany(Blog);
Blog.belongsTo(BloglistUser);

module.exports = {
  Blog,
  BloglistUser
};

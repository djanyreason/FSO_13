const Blog = require('./blog');
const BloglistUser = require('./user');
const ReadingList = require('./readingList');

BloglistUser.hasMany(Blog);
Blog.belongsTo(BloglistUser);

BloglistUser.belongsToMany(Blog, { through: ReadingList, as: 'readings' });
Blog.belongsToMany(BloglistUser, { through: ReadingList, as: 'readers' });

module.exports = {
  Blog,
  BloglistUser,
  ReadingList
};

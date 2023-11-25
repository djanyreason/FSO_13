const Blog = require('./blog');
const BloglistUser = require('./user');
const ReadingList = require('./readingList');
const BloglistSession = require('./sessions');

BloglistUser.hasMany(Blog);
Blog.belongsTo(BloglistUser);

BloglistUser.belongsToMany(Blog, { through: ReadingList, as: 'readings' });
Blog.belongsToMany(BloglistUser, { through: ReadingList, as: 'readers' });

BloglistUser.hasMany(BloglistSession);
BloglistSession.belongsTo(BloglistUser);

module.exports = {
  Blog,
  BloglistUser,
  ReadingList,
  BloglistSession
};

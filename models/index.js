// import all models
const User = require('./User');
const Vote = require('./Vote');
const Comment = require('./Comment');
const Park = require('./Park');

// create associations

User.hasMany(Park, {
  foreignKey: 'user_id'
});

Park.belongsTo(User, {
  foreignKey: 'user_id',
  onDelete: 'SET NULL'
});

User.belongsToMany(Park, {
  through: Vote,
  as: 'voted_parks',

  foreignKey: 'user_id',
  onDelete: 'SET NULL'
});

Park.belongsToMany(User, {
  through: Vote,
  as: 'voted_parks',
  foreignKey: 'park_id',
  onDelete: 'SET NULL'
});

Vote.belongsTo(User, {
  foreignKey: 'user_id',
  onDelete: 'SET NULL'
});

Vote.belongsTo(Park, {
  foreignKey: 'park_id',
  onDelete: 'SET NULL'
});

User.hasMany(Vote, {
  foreignKey: 'user_id'
});

Park.hasMany(Vote, {
  foreignKey: 'park_id'
});

Comment.belongsTo(User, {
  foreignKey: 'user_id',
  onDelete: 'SET NULL'
});

Comment.belongsTo(Park, {
  foreignKey: 'park_id',
  onDelete: 'SET NULL'
});

User.hasMany(Comment, {
  foreignKey: 'user_id',
  onDelete: 'SET NULL'
});

Park.hasMany(Comment, {
  foreignKey: 'park_id'
});

module.exports = { User, Park, Vote, Comment };

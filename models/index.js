const Sequelize = require('sequelize');
const User = require('./user');
const alarm = require('./alarm');

const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];
const db = {};

const sequelize = new Sequelize(
    config.database, config.username, config.password, config
);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.User=User;
db.alarm=alarm;

User.init(sequelize);
alarm.init(sequelize);

User.associate(db);
alarm.associate(db);

module.exports = db;
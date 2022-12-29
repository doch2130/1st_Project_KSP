const Sequelize = require('sequelize');
const config = require('../config/config.json')['development'];

const db = {};

const sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

// Login DB, User 테이블
db.User = require('./User')(sequelize, Sequelize);

module.exports = db;

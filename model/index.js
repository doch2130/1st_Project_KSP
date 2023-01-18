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
db.LikeSing = require('./LikeSing')(sequelize, Sequelize);
db.Board = require("./Board")(sequelize, Sequelize);
db.BoardComment = require('./BoardComment')(sequelize, Sequelize);
db.BoardNestedComment = require('./BoardNestedComment')(sequelize, Sequelize);

module.exports = db;

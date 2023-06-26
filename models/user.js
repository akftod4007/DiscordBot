const Sequelize = require('sequelize');

module.exports = class User extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          allowNull: false,
          primaryKey: true
        },
        //디스코드 유저 id
        userId: {
          type: Sequelize.STRING(100),
          allowNull: false,
          unique: true
        }
      },
      {
        sequelize,
        timestamps: false,
        underscored: false,
        modelName: 'User',
        tableName: 'users',
        paranoid: false,
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',
      }
    );
  }

  static associate(db) {
    db.User.hasMany(db.alarm, { foreignKey: 'userId',sourceKey: 'userId' });
  }
};
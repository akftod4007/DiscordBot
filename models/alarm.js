const Sequelize = require('sequelize');

module.exports = class alarm extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        alarmId: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          allowNull: false,
          primaryKey: true,
        },
        alarmtime: {
          type: Sequelize.STRING(100),
          allowNull: false,
        },
        memo: {
          type: Sequelize.STRING(100),
          allowNull: false,
        },
        //api 처리 결과
        departure:{
          type: Sequelize.STRING(1000),
          allowNull:false
        },
        destination:{
          type: Sequelize.STRING(1000),
          allowNull:false
        },
        userId: {
          type: Sequelize.STRING(100),
          allowNull: false,
        }
      },
      {
        sequelize,
        timestamps: false,
        underscored: false,
        modelName: 'Alarm',
        tableName: 'alarms',
        paranoid: false,
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',
      }
    );
  }

  static associate(db) {
    db.alarm.belongsTo(db.User, { foreignKey: 'userId', targetKey: 'userId' });
  }
};

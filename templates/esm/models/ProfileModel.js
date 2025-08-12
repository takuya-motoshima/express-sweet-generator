import * as expx from 'express-sweet';
import UserModel from './UserModel.js';

export default class extends expx.database.Model {
  static get table() {
    return 'profile';
  }

  static get attributes() {
    return {
      id: {
        type: this.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      userId:  this.DataTypes.INTEGER,
      address: this.DataTypes.STRING,
      tel: this.DataTypes.STRING,
      created: this.DataTypes.DATE,
      modified: this.DataTypes.DATE
    };
  }

  /**
   * @see https://sequelize.org/master/manual/assocs.html
   */
  static association() {
    // Profile belongs to one user.
    this.belongsTo(UserModel, {
      foreignKey: 'userId',  // profile.userId,
      targetKey: 'id',  // user.id
      as: 'user'
    });
  }
}
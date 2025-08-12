const expx = require('express-sweet');

module.exports = class extends expx.database.Model {
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
    const UserModel = require('./UserModel');
    this.belongsTo(UserModel, {
      foreignKey: 'userId',  // profile.userId,
      targetKey: 'id',  // user.id
      as: 'user'
    });
  }
}
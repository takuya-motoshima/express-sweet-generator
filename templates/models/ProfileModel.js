const Model = require('express-sweet').database.Model;

/**
 * User model.
 */
module.exports = class extends Model {
  /**
   * The name of the table that the model accesses.
   */
  static get table() {
    return 'profile';
  }

  /**
   * List of columns in the table accessed by this model.
   */
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
   * This method defines the handling of hasOne, hasMany, belongsTo, belongsToMany, etc. associations with other models that will be executed when the subclass is loaded.
   * 
   * @see https://sequelize.org/master/manual/assocs.html
   */
  static association() {
    const UserModel = require('./UserModel');
    this.belongsTo(UserModel, {foreignKey: 'userId'});
  }
}
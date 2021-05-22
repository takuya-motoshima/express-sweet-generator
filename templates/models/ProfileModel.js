const Model = require('express-sweet').database.Model;

/**
 * Profile model.
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
   * Associate the model.
   * Define associations with other models such as "hasOne", "hasMany", "belongsTo", "belongsToMany".
   * If you omit the alias (as) option, the associated name will be hasOne, singular for belongsTo, and plural for hasMany.
   * This method is called automatically from within the "express-sweet.mount" method, so you don't have to run it yourself.
   * 
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
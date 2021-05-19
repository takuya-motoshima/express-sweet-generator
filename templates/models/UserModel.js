const Model = require('express-sweet').database.Model;

/**
 * User model.
 */
module.exports = class extends Model {
  /**
   * The name of the table that the model accesses.
   */
  static get table() {
    return 'user';
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
      email: this.DataTypes.STRING,
      password: this.DataTypes.STRING,
      name: this.DataTypes.STRING,
      created: this.DataTypes.DATE,
      modified: this.DataTypes.DATE
    };
  }

  /**
   * Associate the model.
   * Define associations with other models such as "hasOne", "hasMany", "belongsTo", "belongsToMany".
   * This method is called automatically from within the "express-sweet.mount" method, so you don't have to run it yourself.
   * 
   * @see https://sequelize.org/master/manual/assocs.html
   */
  static association() {
    // User has one profile.
    const ProfileModel = require('./ProfileModel');
    this.hasOne(ProfileModel, {
      foreignKey: 'userId', // profile.userId
      sourceKey: 'id'       // user.id
    });
  }

  /**
   * Returns page data.
   */
  static async paginate(options) {
    // Initialize options.
    options = Object.assign({
      offset: 0,
      limit: 30,
      search: undefined,
      order: undefined,
      dir: undefined
    }, options);

    // Get total unconditional record count.
    const recordsTotal = await this.count();

    // Filtering options.
    let where = undefined;
    if (options.search != null && options.search.length)
      where = {
        [this.Op.or]: [
          {id: {[this.Op.like]: `%${options.search}%`}},
          {email: {[this.Op.like]: `%${options.search}%`}},
          {name: {[this.Op.like]: `%${options.search}%`}},
          {modified: {[this.Op.like]: `%${options.search}%`}}
        ]
      };

    // Sort options.
    let order = undefined;
    if (options.order != null && options.order.length)
      order = [[options.order, options.dir || 'ASC']];

    // Get page data.
    let data = await this.findAll({
      attributes: ['id', 'email', 'name', 'modified'],
      where,
      order,
      offset: parseInt(options.offset, 10),
      limit: parseInt(options.limit, 10),
      raw: true
    });

    // Get the total record count that matches the condition.
    let recordsFiltered = await this.count({where});
    return {recordsTotal, recordsFiltered, data};
  }
}
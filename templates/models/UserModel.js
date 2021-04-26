const Model = require('express-sweet').database.Model;

/**
 * User model.
 */
module.exports = (class extends Model {
  /**
   * Table name used by the model.
   */
  static get table() {
    return 'user';
  }

  /**
   * Table column list.
   */
  static get attributes() {
    return {
      id: {
        type: Model.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      email: Model.DataTypes.STRING,
      password: Model.DataTypes.STRING,
      name: Model.DataTypes.STRING,
      created: Model.DataTypes.DATE,
      modified: Model.DataTypes.DATE
    };
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
        [Model.Op.or]: [
          {id: {[Model.Op.like]: `%${options.search}%`}},
          {email: {[Model.Op.like]: `%${options.search}%`}},
          {name: {[Model.Op.like]: `%${options.search}%`}},
          {modified: {[Model.Op.like]: `%${options.search}%`}}
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
}).mount();
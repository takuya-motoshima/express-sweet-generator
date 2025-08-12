const expx = require('express-sweet');
const {Media} = require('nodejs-shared');
const NotFoundError = require('../errors/NotFoundError');

module.exports = class extends expx.database.Model {
  static get table() {
    return 'user';
  }

  static get attributes() {
    return {
      id: {
        type: super.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: super.DataTypes.STRING,
      email: super.DataTypes.STRING,
      password: super.DataTypes.STRING,
      icon: super.DataTypes.STRING,
      created: super.DataTypes.DATE,
      modified: super.DataTypes.DATE
    };
  }

  /**
   * @see https://sequelize.org/master/manual/assocs.html
   */
  static association() {
    // User has one profile.
    const ProfileModel = require('./ProfileModel');
    super.hasOne(ProfileModel, {
      foreignKey: 'userId', // profile.userId
      sourceKey: 'id', // user.id
      as: 'profile'
    });

     // User has many comments.
    const CommentModel = require('./CommentModel');
    super.hasMany(CommentModel, {
      foreignKey: 'userId',  // comment.userId
      sourceKey: 'id',  // user.id
      as: 'comments'
    });

     // Users have many books, and books belong to many users.
    const BookModel = require('./BookModel');
    super.hasMany(BookModel, {
      foreignKey: 'userId',  // book.userId
      sourceKey: 'id',  // user.id
      as: 'books'
    });
  }

  static async getUser(userId) {
    return super.findOne({
      attributes: ['id', 'name', 'email', 'icon', 'created', 'modified'],
      where: {id: userId}
    });
  }

  static async paginate(paginationOptions) {
    paginationOptions = Object.assign({
      start: 0,
      length: 30,
      order: null,
      dir: 'asc',
      search: null,
    }, paginationOptions);

    // Calculate total records.
    const recordsTotal = await super.count();

    // Where clause for filtering data.
    const whereClause = {};
    if (paginationOptions.search)
      whereClause[super.Op.or] = [
        {email: {[super.Op.like]: `%${paginationOptions.search}%`}},
        {name: {[super.Op.like]: `%${paginationOptions.search}%`}}
      ];

    // Calculate filtered records.
    const recordsFiltered = await super.count({where: whereClause});

    // Fetch paginated data.
    const data = await super.findAll({
      attributes: ['id', 'name', 'email', 'icon', 'modified'],
      where: whereClause,
      order: [
        [super.col(paginationOptions.order), paginationOptions.dir],
      ],
      offset: parseInt(paginationOptions.start, 10),
      limit: parseInt(paginationOptions.length),
      raw: true
    });
    return {recordsTotal, recordsFiltered, data};
  }

  static async createUser(userData) {
    let transaction;
    try {
      userData = Object.assign({
        email: null,
        name: null,
        password: null,
        icon: null
      }, userData);
      transaction = await super.begin();
      const user = await  super.create({
        name: userData.name,
        email: userData.email,
        password: userData.password,
      }, {transaction});

      await this.#updateUserIcon(user, userData.icon, transaction);

      await transaction.commit();

      console.log('Successfully created a new user with ID:', user.id);
    } catch (error) {
      if (transaction)
        await transaction.rollback();
      throw error;
    }
  }

  static async updateUser(userId, userData) {
    let transaction;
    try {
      userData = Object.assign({
        email: null,
        name: null,
        password: null,
        icon: null
      }, userData);
      const user = await this.getUser(userId);
      if (!user)
        throw new NotFoundError();
      transaction = await super.begin();
      user.email = userData.email;
      user.name = userData.name;
      user.modified = super.literal('CURRENT_TIMESTAMP');
      if (userData.password)
        user.password = userData.password;

      await user.save({transaction});
      await this.#updateUserIcon(user, userData.icon, transaction);

      await transaction.commit();

      console.log(`Successfully updated user with ID: ${userId}`);
    } catch (error) {
      if (transaction)
        await transaction.rollback();
      throw error;
    }
  }

  static async #updateUserIcon(user, dataUrl, transaction) {
    user.icon = `/upload/${user.id}.${Media.getExtensionFromDataUrl(dataUrl)}`;
    await user.save({transaction});
    const iconPath = `${global.APP_DIR}/public${user.icon}`;
    Media.writeDataUrlToFile(iconPath, dataUrl);
  }

  static async deleteUser(userId) {
    await super.destroy({where: {id: userId}});
    console.log(`Successfully deleted user with ID: ${userId}`);
  }

  static async emailExists(email, excludeUserId = null) {
    // Where clause for filtering data.
    const whereClause = {email};
    if (excludeUserId)
      whereClause.id = {[super.Op.ne]: excludeUserId};
    return await super.count({where: whereClause}) > 0;
  }

  static async userIdExists(userId) {
    // Where clause for filtering data.
    const whereClause = {email};
    if (excludeUserId)
      whereClause.id = {[super.Op.ne]: excludeUserId};
    return await super.count({where: whereClause}) > 0;
  }
}
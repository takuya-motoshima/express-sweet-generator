import {Media} from 'nodejs-shared';
import * as sweet from 'express-sweet';
import UserNotFound from '../exceptions/UserNotFound';
import ProfileModel from './ProfileModel';
import CommentModel from './CommentModel';
import BookModel from './BookModel';

export default class extends sweet.database.Model {
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
    super.hasOne(ProfileModel, {
      foreignKey: 'userId', // profile.userId
      sourceKey: 'id', // user.id
      as: 'profile'
    });

     // User has many comments.
    super.hasMany(CommentModel, {
      foreignKey: 'userId',  // comment.userId
      sourceKey: 'id',  // user.id
      as: 'comments'
    });

     // Users have many books, and books belong to many users.
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

  static async paginate(options) {
    options = Object.assign({
      start: 0,
      length: 30,
      order: null,
      dir: 'asc',
      search: null,
    }, options);
    const recordsTotal = await super.count();
    let where;
    if (options.search)
      where = {
        [super.Op.or]: [
          {email: {[super.Op.like]: `%${options.search}%`}},
          {name: {[super.Op.like]: `%${options.search}%`}}
        ]
      };
    const recordsFiltered = await super.count({where});
    const data = await super.findAll({
      attributes: ['id', 'name', 'email', 'icon', 'modified'],
      where,
      order: [[options.order, options.dir]],
      offset: parseInt(options.start, 10),
      limit: parseInt(options.length),
      raw: true
    });
    return {recordsTotal, recordsFiltered, data};
  }

  static async createUser(set) {
    let transaction;
    try {
      set = Object.assign({
        email: null,
        name: null,
        password: null,
        icon: null
      }, set);
      transaction = await super.begin();
      const user = await  super.create({
        name: set.name,
        email: set.email,
        password: set.password,
      }, {transaction});
      await this.#updateUserIcon(user, set.icon, transaction);
      await transaction.commit();
    } catch (err) {
      if (transaction)
        await transaction.rollback();
      throw err;
    }
  }

  static async updateUser(userId, set) {
    let transaction;
    try {
      set = Object.assign({
        email: null,
        name: null,
        password: null,
        icon: null
      }, set);
      const user = await this.getUser(userId);
      if (!user)
        throw new UserNotFound();
      transaction = await super.begin();
      user.email = set.email;
      user.name = set.name;
      user.modified = super.literal('CURRENT_TIMESTAMP');
      if (set.password)
        user.password = set.password;
      await user.save({transaction});
      await this.#updateUserIcon(user, set.icon, transaction);
      await transaction.commit();
    } catch (err) {
      if (transaction)
        await transaction.rollback();
      throw err;
    }
  }

  static async #updateUserIcon(user, dataUrl, transaction) {
    user.icon = `/upload/${user.id}.${Media.getExtensionFromDataUrl(dataUrl)}`;
    await user.save({transaction});
    const iconPath = `${global.APP_DIR}/public${user.icon}`;
    console.log(`Write ${iconPath}`);
    Media.writeDataUrlToFile(iconPath, dataUrl);
  }

  static async deleteUser(userId) {
    console.log(`Delete a user whose ID is ${userId}`);
    return super.destroy({where: {id: userId}});
  }

  static async emailExists(email, excludeUserId = null) {
    const where = {email};
    if (excludeUserId)
      where.id = {[super.Op.ne]: excludeUserId};
    return await super.count({where}) > 0;
  }

  static async userIdExists(userId) {
    const where = {email};
    if (excludeUserId)
      where.id = {[super.Op.ne]: excludeUserId};
    return await super.count({where}) > 0;
  }
}
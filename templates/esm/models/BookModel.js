import * as sweet from 'express-sweet';

/**
 * Book model.
 */
export default class extends sweet.database.Model {
  /**
   * The name of the table that the model accesses.
   */
  static get table() {
    return 'book';
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
      title: this.DataTypes.STRING,
      created: this.DataTypes.DATE,
      modified: this.DataTypes.DATE
    };
  }
}
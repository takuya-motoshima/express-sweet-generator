import * as expressExtension from 'express-sweet';

export default class extends expressExtension.database.Model {
  static get table() {
    return 'comment';
  }

  static get attributes() {
    return {
      id: {
        type: this.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      userId:  this.DataTypes.INTEGER,
      text: this.DataTypes.STRING,
      created: this.DataTypes.DATE,
      modified: this.DataTypes.DATE
    };
  }
}
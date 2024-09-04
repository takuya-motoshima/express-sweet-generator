const expressExtension = require('express-sweet');

module.exports = class extends expressExtension.database.Model {
  static get table() {
    return 'book';
  }

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
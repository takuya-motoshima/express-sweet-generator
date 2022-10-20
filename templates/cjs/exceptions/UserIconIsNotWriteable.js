module.exports = class extends Error {
  constructor() {
    super('User icon cannot be written');
    this.name = 'UserIconIsNotWriteable';
  }
}
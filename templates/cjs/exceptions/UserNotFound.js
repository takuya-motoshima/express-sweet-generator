module.exports = class extends Error {
  constructor() {
    super('User not found');
    this.name = 'UserNotFound';
  }
}
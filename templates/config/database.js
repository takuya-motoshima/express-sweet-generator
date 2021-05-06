/**
 * Database configuration.
 */
module.exports = {
  development: {
    username: 'root',
    database: 'example',
    host: 'localhost',
    dialect: 'mariadb',
    // timezone: 'Etc/GMT-9',
    logging: false,
    // dialectOptions: {useUTC: false, timezone: 'Etc/GMT-9'}
  },
  test: {
    username: 'root',
    database: 'example',
    host: 'localhost',
    dialect: 'mariadb',
    // timezone: 'Etc/GMT-9',
    logging: false,
    // dialectOptions: {useUTC: false, timezone: 'Etc/GMT-9'}
  },
  production: {
    username: 'root',
    database: 'example',
    host: 'localhost',
    dialect: 'mariadb',
    // timezone: 'Etc/GMT-9',
    logging: false,
    // dialectOptions: {useUTC: false, timezone: 'Etc/GMT-9'}
  }
}
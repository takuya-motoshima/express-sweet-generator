/**
 * Database configuration.
 */
module.exports = {
  development: {
    username: 'root',
    password: null,
    database: 'example',
    host: 'localhost',
    port: undefined,
    dialect: 'mariadb',
    timezone: '+09:00',
    // timezone: 'Etc/GMT-9',
    logging: false,
    // dialectOptions: {useUTC: false, timezone: 'Etc/GMT-9'}
  },
  test: {
    username: 'root',
    password: null,
    database: 'example',
    host: 'localhost',
    port: undefined,
    dialect: 'mariadb',
    timezone: '+09:00',
    // timezone: 'Etc/GMT-9',
    logging: false,
    // dialectOptions: {useUTC: false, timezone: 'Etc/GMT-9'}
  },
  production: {
    username: 'root',
    password: null,
    database: 'example',
    host: 'localhost',
    port: undefined,
    dialect: 'mariadb',
    timezone: '+09:00',
    // timezone: 'Etc/GMT-9',
    logging: false,
    // dialectOptions: {useUTC: false, timezone: 'Etc/GMT-9'}
  }
}
/**
 * Database configuration.
 */
export default {
  development: {
    username: 'root',
    // password: 'password',
    database: 'sampledb',
    host: 'localhost',
    port: undefined,
    dialect: 'mariadb',
    timezone: '+09:00',
    logging: false
  },
  test: {
    username: 'root',
    // password: 'password',
    database: 'sampledb',
    host: 'localhost',
    port: undefined,
    dialect: 'mariadb',
    timezone: '+09:00',
    logging: false
  },
  production: {
    username: 'root',
    // password: 'password',
    database: 'sampledb',
    host: 'localhost',
    port: undefined,
    dialect: 'mariadb',
    timezone: '+09:00',
    logging: false
  }
}
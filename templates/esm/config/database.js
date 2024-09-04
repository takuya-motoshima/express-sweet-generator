/**
 * Database configuration.
 */
export default {
  development: {
    username: 'root',
    password: 'password',
    database: 'sample_db',
    host: 'localhost',
    port: undefined,
    dialect: 'mariadb',
    timezone: '+09:00',
    logging: false
  },
  test: {
    username: 'root',
    password: 'password',
    database: 'sample_db',
    host: 'localhost',
    port: undefined,
    dialect: 'mariadb',
    timezone: '+09:00',
    logging: false
  },
  production: {
    username: 'root',
    password: 'password',
    database: 'sample_db',
    host: 'localhost',
    port: undefined,
    dialect: 'mariadb',
    timezone: '+09:00',
    logging: false
  }
}
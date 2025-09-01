/**
 * Sequelize Database Configuration
 * 
 * @description Database connection settings for different environments
 * Includes connection pool configuration for each environment
 * 
 * @example
 * // Connection pool configuration examples
 * // The max value must be set appropriately according to the DB's max_connections
 * 
 * // How to check max_connections in MariaDB:
 * // SHOW VARIABLES LIKE 'max_connections';
 * // +-----------------+-------+
 * // | Variable_name   | Value |
 * // +-----------------+-------+
 * // | max_connections | 151   |
 * // +-----------------+-------+
 * 
 * // Configuration example when max_connections=151:
 * pool: {
 *   // Maximum 100 connections (66.2% usage of max_connections=151)
 *   // Keep total connections from all instances within 70-80% of max_connections
 *   max: 100,
 *   // Maintain 10 connections constantly (ensures stability during load increases)
 *   min: 10,
 *   // 10 second timeout for connection acquisition
 *   acquire: 10000,
 *   // Mark for deletion after 3 seconds of inactivity
 *   idle: 3000,
 *   // Check for idle connections every 10 seconds
 *   evict: 10000
 * }
 * 
 * // Configuration example when max_connections=5297:
 * pool: {
 *   // Maximum 300 connections per instance (6 instances peak = 1800 connections = 34.0% usage)
 *   // Distribute connections across multiple instances while staying within safe limits
 *   max: 300,
 *   // Maintain 30 connections constantly (ensures stability during high load)
 *   min: 30,
 *   // 30 second timeout for connection acquisition
 *   acquire: 30000,
 *   // Mark for deletion after 10 seconds of inactivity
 *   idle: 10000,
 *   // Check for idle connections every 30 seconds
 *   evict: 30000
 * }
 */
module.exports = {
  // Development environment configuration
  development: {
    username: 'root',
    password: 'password',
    database: 'sample_db',
    host: 'localhost',
    port: undefined,
    dialect: 'mariadb',
    timezone: '+09:00',
    logging: false,
    // pool: {
    //   // Maximum connections (adjust based on your DB's max_connections)
    //   max: 100,
    //   // Maintain minimum connections constantly
    //   min: 10,
    //   // Connection acquisition timeout
    //   acquire: 10000,
    //   // Mark for deletion after inactivity
    //   idle: 2000,
    //   // Check for idle connections interval
    //   evict: 10000
    // }
  },
  
  // Test environment configuration
  test: {
    username: 'root',
    password: 'password',
    database: 'sample_db',
    host: 'localhost',
    port: undefined,
    dialect: 'mariadb',
    timezone: '+09:00',
    logging: false,
    // pool: {
    //   // Maximum connections (adjust based on your DB's max_connections)
    //   max: 100,
    //   // Maintain minimum connections constantly
    //   min: 10,
    //   // Connection acquisition timeout
    //   acquire: 10000,
    //   // Mark for deletion after inactivity
    //   idle: 3000,
    //   // Check for idle connections interval
    //   evict: 10000
    // }
  },
  
  // Production environment configuration
  production: {
    username: 'root',
    password: 'password',
    database: 'sample_db',
    host: 'localhost',
    port: undefined,
    dialect: 'mariadb',
    timezone: '+09:00',
    logging: false,
    // pool: {
    //   // Maximum connections (adjust based on your DB's max_connections and instance count)
    //   max: 300,
    //   // Maintain minimum connections constantly
    //   min: 30,
    //   // Connection acquisition timeout
    //   acquire: 30000,
    //   // Mark for deletion after inactivity
    //   idle: 10000,
    //   // Check for idle connections interval
    //   evict: 30000
    // }
  }
}
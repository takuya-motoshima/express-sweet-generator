# EXPRESS SWEET

[EXPRESS SWEET](https://www.npmjs.com/package/express-sweet)'s application generator.

A comprehensive list of changes in each version may be found in the [CHANGELOG](CHANGELOG.md).

## Installation

```bash
npm install -g express-sweet-generator
```

## Quick Start

Use the application generator tool, `express-sweet-generator`, to quickly create an application skeleton.

![Image](screencaps/demonstration.webp)

### 1. Generate Application

Create an Express app named `myapp`. The app will be created in a folder named `myapp` in the current working directory.

```bash
# Generate ESM (ECMAScript Modules) application
express-sweet -o esm myapp

# Or generate CJS (CommonJS) application (default)
express-sweet myapp
```

### 2. Install Dependencies

```bash
cd myapp/
npm install
```

### 3. Database Setup

The skeleton application uses a MySQL/MariaDB database. Create a database with the following SQL:

```sql
-- Create database
CREATE DATABASE IF NOT EXISTS `sample_db` DEFAULT CHARACTER SET utf8mb4;

USE `sample_db`;

-- User table: Stores user account information
CREATE TABLE `user` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT 'Primary key',
  `name` varchar(30) NOT NULL COMMENT 'User display name',
  `email` varchar(255) NOT NULL COMMENT 'User email address (unique)',
  `password` varchar(100) NOT NULL COMMENT 'Encrypted password',
  `icon` varchar(768) NOT NULL DEFAULT MD5(RAND()) COMMENT 'User icon path or identifier',
  `created` datetime NOT NULL DEFAULT current_timestamp() COMMENT 'Record creation timestamp',
  `modified` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp() COMMENT 'Record last modified timestamp',
  PRIMARY KEY (`id`),
  UNIQUE KEY `ukUserEmail` (`email`),
  UNIQUE KEY `ukUserIcon`(`icon`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='User accounts table';

-- Profile table: Stores additional user profile information
CREATE TABLE `profile` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT 'Primary key',
  `userId` int(10) unsigned NOT NULL COMMENT 'Foreign key to user table',
  `address` varchar(255) NOT NULL COMMENT 'User address',
  `tel` varchar(14) NOT NULL COMMENT 'User telephone number',
  `created` datetime NOT NULL DEFAULT current_timestamp() COMMENT 'Record creation timestamp',
  `modified` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp() COMMENT 'Record last modified timestamp',
  PRIMARY KEY (`id`),
  UNIQUE KEY `ukProfileUserId` (`userId`),
  CONSTRAINT `fkProfileUser` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='User profiles table';

-- Comment table: Stores user comments
CREATE TABLE `comment` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT 'Primary key',
  `userId` int(10) unsigned NOT NULL COMMENT 'Foreign key to user table',
  `text` text NOT NULL COMMENT 'Comment text content',
  `created` datetime NOT NULL DEFAULT current_timestamp() COMMENT 'Record creation timestamp',
  `modified` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp() COMMENT 'Record last modified timestamp',
  PRIMARY KEY (`id`),
  CONSTRAINT `fkCommentUser` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='User comments table';

-- Book table: Stores user books
CREATE TABLE `book` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT 'Primary key',
  `userId` int(10) unsigned NOT NULL COMMENT 'Foreign key to user table',
  `title` text NOT NULL COMMENT 'Book title',
  `created` datetime NOT NULL DEFAULT current_timestamp() COMMENT 'Record creation timestamp',
  `modified` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp() COMMENT 'Record last modified timestamp',
  PRIMARY KEY (`id`),
  UNIQUE KEY `ukBookTitle` (`userId`, `title`(255)),
  CONSTRAINT `fkBookUser` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='User books table';

-- Sample data insertion
INSERT INTO `user` (`id`, `email`, `password`, `name`, `icon`) VALUES
  (1, 'robin@example.com', 'password', 'Robin', '/upload/1.png'),
  (2, 'taylor@example.com', 'password', 'Taylor', '/upload/2.png');

INSERT INTO `profile` (`userId`, `address`, `tel`) VALUES
  (1, '777 Brockton Avenue, Abington MA 2351', '202-555-0105'),
  (2, '30 Memorial Drive, Avon MA 2322', '');

INSERT INTO `comment` (`userId`, `text`) VALUES
  (1, 'From Robin #1'),
  (1, 'From Robin #2'),
  (2, 'From Taylor #1');

INSERT INTO `book` (`userId`, `title`) VALUES
  (1, 'Beautiful'),
  (1, 'Lose Yourself'),
  (2, 'When Im Gone');
```

### 4. Database Configuration

Configure the database connection in `config/database.js`. For more details, refer to the [Sequelize documentation](https://sequelize.org/docs/v6/other-topics/migrations/#configuration).

**For ESM applications:**
```js
export default {
  development: {
    username: 'root',
    password: 'password',
    database: 'sample_db',
    host: 'localhost',
    dialect: 'mariadb'
  },
  test: {
    username: 'root',
    password: 'password',
    database: 'sample_db',
    host: 'localhost',
    dialect: 'mariadb'
  },
  production: {
    username: 'root',
    password: 'password',
    database: 'sample_db',
    host: 'localhost',
    dialect: 'mariadb'
  }
}
```

**For CJS applications:**
```js
module.exports = {
  development: {
    username: 'root',
    password: 'password',
    database: 'sample_db',
    host: 'localhost',
    dialect: 'mariadb'
  },
  test: {
    username: 'root',
    password: 'password',
    database: 'sample_db',
    host: 'localhost',
    dialect: 'mariadb'
  },
  production: {
    username: 'root',
    password: 'password',
    database: 'sample_db',
    host: 'localhost',
    dialect: 'mariadb'
  }
}
```

### 5. Environment Configuration

The database environment can be defined in the `.env` file:

```bash
NODE_ENV=development
```

### 6. Run the Application

Start the application:

```bash
npm start
```

### 7. Access the Application

Open your browser and navigate to `http://localhost:3000/` to access the app.

## Application Structure

The generated application has the following directory structure:

```
.
├── .env                          # Environment variables
├── app.js                        # Main application file
├── ecosystem.config.js           # PM2 configuration
├── nginx.sample.conf             # Sample Nginx configuration
├── package.json                  # Node.js dependencies and scripts
├── bin
│   └── www                       # Application startup script
├── client                        # Frontend application
│   ├── package.json              # Frontend dependencies
│   ├── webpack.config.js         # Webpack configuration
│   └── src                       # Frontend source code
├── config                        # Application configuration
│   ├── authentication.js         # Authentication settings
│   ├── config.js                 # General configuration
│   ├── database.js               # Database configuration
│   └── view.js                   # View engine configuration
├── errors                        # Custom error classes
│   └── NotFoundError.js          # 404 error handler
├── middlewares                   # Express middlewares
│   └── checkValidationResult.js  # Validation middleware
├── models                        # Sequelize models
│   ├── BookModel.js              # Book model
│   ├── CommentModel.js           # Comment model
│   ├── ProfileModel.js           # Profile model
│   └── UserModel.js              # User model
├── public                        # Static assets
│   ├── build                     # Built frontend assets
│   └── upload                    # User uploaded files
├── routes                        # Express routes
│   ├── login.js                  # Login routes
│   ├── profile.js                # Profile routes
│   ├── users.js                  # User routes
│   └── api                       # API routes
│       ├── profile.js            # Profile API routes
│       └── users.js              # User API routes
├── shared                        # Shared utilities
│   └── isEmpty.js                # Utility functions
├── validators                    # Custom validators
│   └── isValidImageDataUrl.js    # Image validation
└── views                         # Handlebars templates
    ├── error.hbs                 # Error page template
    ├── login.hbs                 # Login page template
    ├── layout
    │   └── default.hbs           # Default layout template
    ├── partials
    │   └── .gitkeep              # Partial templates directory
    ├── users
    │   └── index.hbs             # Users index template
    ├── profile
    │   ├── show.hbs              # Profile show template
    │   └── edit.hbs              # Profile edit template
    └── errors
        ├── 404.hbs               # 404 error template
        └── 500.hbs               # 500 error template
```

## Command Options

```bash
express-sweet [options] [dir]

Options:
  -o, --output <output>   Add output module support (esm|cjs) (defaults to cjs)
  -p, --port <port>       Application listening port (default: 3000)
  -f, --force             Force creation on non-empty directory
  -V, --version           Display version number
  -h, --help              Display help for command
```

## Author

**Takuya Motoshima**

* [github/takuya-motoshima](https://github.com/takuya-motoshima)
* [x/takuya_motech](https://x.com/takuya_motech)
* [facebook/takuya.motoshima.7](https://www.facebook.com/takuya.motoshima.7)

## License

[MIT](LICENSE)
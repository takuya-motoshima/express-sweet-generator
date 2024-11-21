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

1. For example, the following creates an Express app named `myapp`. The app will be created in a folder named `myapp` in the current working directory.
    ```bash
    express-sweet -o esm myapp
    ```
1. Then install dependencies.
    ```bash
    cd myapp/
    npm install
    ```
1. The skeleton uses a DB. Please create a DB with the following SQL.
    ```sql
    CREATE DATABASE IF NOT EXISTS `sample_db` DEFAULT CHARACTER SET utf8mb4;

    USE `sample_db`;

    CREATE TABLE `user` (
        `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
        `name` varchar(30) NOT NULL,
        `email` varchar(255) NOT NULL,
        `password` varchar(100) NOT NULL,
        `icon` varchar(768) NOT NULL DEFAULT MD5(RAND()),
        `created` datetime NOT NULL DEFAULT current_timestamp(),
        `modified` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
        PRIMARY KEY (`id`),
        UNIQUE KEY `ukUserEmail` (`email`),
        UNIQUE KEY `ukUserIcon`(`icon`)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

    CREATE TABLE `profile` (
        `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
        `userId` int(10) unsigned NOT NULL,
        `address` varchar(255) NOT NULL,
        `tel` varchar(14) NOT NULL,
        `created` datetime NOT NULL DEFAULT current_timestamp(),
        `modified` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
        PRIMARY KEY (`id`),
        UNIQUE KEY `ukProfileUserId` (`userId`),
        CONSTRAINT `fkProfileUser` FOREIGN KEY (`userId`) REFERENCES `user` (`id`)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

    CREATE TABLE `comment` (
        `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
        `userId` int(10) unsigned NOT NULL,
        `text` text NOT NULL,
        `created` datetime NOT NULL DEFAULT current_timestamp(),
        `modified` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
        PRIMARY KEY (`id`),
        CONSTRAINT `fkCommentUser` FOREIGN KEY (`userId`) REFERENCES `user` (`id`)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

    CREATE TABLE `book` (
        `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
        `userId` int(10) unsigned NOT NULL,
        `title` text NOT NULL,
        `created` datetime NOT NULL DEFAULT current_timestamp(),
        `modified` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
        PRIMARY KEY (`id`),
        UNIQUE KEY `ukBookTitle` (`userId`, `title`(255)),
        CONSTRAINT `fkBookUser` FOREIGN KEY (`userId`) REFERENCES `user` (`id`)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

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
1. Set the DB connection method in `config/database.js`. For details, please refer to [here](https://sequelize.org/docs/v6/other-topics/migrations/#cfg).
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
1. The DB to be accessed can be defined for each environment. Specify the environment in the `.env` file
    ```bash
    NODE_ENV=development
    ```
1. Run the application with the following command.
    ```bash
    npm start
    ```
1. Then, load `http://localhost:3000/` in your browser to access the app.  
    The generated app has the following directory structure:
    ```bash
    .
    ├── .env
    ├── app.js
    ├── ecosystem.config.js
    ├── nginx.sample.conf
    ├── package.json
    ├── bin
    │   └── www
    ├── client
    │   ├── package.json
    │   ├── webpack.config.js
    │   └── src
    ├── config
    │   ├── authentication.js
    │   ├── config.js
    │   ├── database.js
    │   └── view.js
    ├── errors
    │   └── NotFoundError.js
    ├── middlewares
    │   └── checkValidationResult.js
    ├── models
    │   ├── BookModel.js
    │   ├── CommentModel.js
    │   ├── ProfileModel.js
    │   └── UserModel.js
    ├── public
    │   ├── build
    │   └── upload
    ├── routes
    │   ├── login.js
    │   ├── users.js
    │   └── api
    │       └── users.js
    ├── shared
    │   └── isEmpty.js
    ├── validators
    │   └── isValidImageDataUrl.js
    └── views
        ├── edit-personal.hbs
        ├── error.hbs
        ├── login.hbs
        ├── personal.hbs
        ├── users.hbs
        ├── layout
        │   └── default.hbs
        └── partials
        │   └── .gitkeep
        └── errors
            ├── 404.hbs
            └── 500.hbs
    ```

## Author
**Takuya Motoshima**

* [github/takuya-motoshima](https://github.com/takuya-motoshima)
* [twitter/TakuyaMotoshima](https://twitter.com/TakuyaMotoshima)
* [facebook/takuya.motoshima.7](https://www.facebook.com/takuya.motoshima.7)

## License
[MIT](LICENSE)
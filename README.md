<a href="https://takuya-motoshima.github.io/express-sweet/"><img src="https://raw.githubusercontent.com/takuya-motoshima/express-sweet-generator/main/logo.svg" height="140"></a>

[Express Sweet](https://www.npmjs.com/package/express-sweet) application generator.

## Introduction

The package elements that make up this extension.  
In addition, some packages have been customized to make them easier for developers to use.  

* Framework  
    The framework uses Expess v4.  
    Express is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.
* URI Routing  
    Express Sweet automatically maps the URL to express.Router defined in the routes directory.
* Model  
    The model uses Sequelize v6.  
    Sequelize is a promise-based Node.js ORM for Postgres, MySQL, MariaDB, SQLite and Microsoft SQL Server. It features solid transaction support, relations, eager and lazy loading, read replication and more.
* View  
    The view template engine uses Handlebars v4.  
    Handlebars is a simple templating language.  
    It uses a template and an input object to generate HTML or other text formats. Handlebars templates look like regular text with embedded Handlebars expressions.
* User authentication  
    User authentication uses Passport v0.4.1.  
    Passport is Express-compatible authentication middleware for Node.js.
* Service  
    Sweet includes a convenient interface for developing applications using "Amazon Rekognition" and "Google Cloud Vision".
* Utils  
    With Sweet, you can quickly use a variety of generic utility classes.

## Docs

* [Website and Documentation](https://takuya-motoshima.github.io/express-sweet/) - [[website repo](https://github.com/takuya-motoshima/express-sweet)]

## Installation

```sh
npm install -g express-sweet-generator;
```

## Quick Start

The quickest way to get started with Express Sweet is to utilize the executable `express-sweet(1)` to generate an application as shown below.  
The application created here includes the following screens from the beginning.  

<table>
    <tr>
        <td valign="top">
            <div>Login</div>
            <img src="https://raw.githubusercontent.com/takuya-motoshima/express-sweet-generator/main/screencaps/login.png" width="400">
        </td>
        <td valign="top">
            <div>Home</div>
            <img src="https://raw.githubusercontent.com/takuya-motoshima/express-sweet-generator/main/screencaps/home.png" width="400">
        </td>
    </tr>
    <tr>
        <td valign="top">
            <div>User list</div>
            <img src="https://raw.githubusercontent.com/takuya-motoshima/express-sweet-generator/main/screencaps/user-list.png" width="400">
        </td>
        <td valign="top">
            <div>New user</div>
            <img src="https://raw.githubusercontent.com/takuya-motoshima/express-sweet-generator/main/screencaps/new-user.png" width="400">
        </td>
    </tr>
    <tr>
        <td valign="top">
            <div>Edit user</div>
            <img src="https://raw.githubusercontent.com/takuya-motoshima/express-sweet-generator/main/screencaps/edit-user.png" width="400">
        </td>
    </tr>
</table>

Create the app.

```sh
express-sweet /tmp/foo && cd /tmp/foo;
```

Install dependencies.

```sh
npm install;
```

Create DB.

```sh
CREATE DATABASE IF NOT EXISTS `example` DEFAULT CHARACTER SET utf8mb4;

USE `example`;

DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `password` varchar(100) NOT NULL,
  `name` varchar(30) NOT NULL,
  `created` datetime NOT NULL DEFAULT current_timestamp(),
  `modified` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `ukAccount1` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

DROP TABLE IF EXISTS `profile`;
CREATE TABLE `profile` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `userId` int(10) unsigned NOT NULL,
  `address` varchar(255) NOT NULL,
  `tel` varchar(14) NOT NULL,
  `created` datetime NOT NULL DEFAULT current_timestamp(),
  `modified` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  CONSTRAINT `fkUser` FOREIGN KEY (`userId`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `user` (`id`, `email`, `password`, `name`) VALUES
  (1, 'robin@example.com', 'password', 'Robin'),
  (2, 'taylor@example.com', 'password', 'Taylor'),
  (3, 'vivian@example.com', 'password', 'Vivian'),
  (4, 'harry@example.com', 'password', 'Harry'),
  (5, 'eliza@example.com', 'password', 'Eliza'),
  (6, 'nancy@example.com', 'password', 'Nancy'),
  (7, 'melinda@example.com', 'password', 'Melinda'),
  (8, 'harley@example.com', 'password', 'Harley');

INSERT INTO `profile` (`userId`, `address`, `tel`) VALUES
  (1, '777 Brockton Avenue, Abington MA 2351', '202-555-0105'),
  (2, '30 Memorial Drive, Avon MA 2322', ''),
  (3, '250 Hartford Avenue, Bellingham MA 2019', '202-555-0175'),
  (4, '700 Oak Street, Brockton MA 2301', '202-555-0167'),
  (5, '66-4 Parkhurst Rd, Chelmsford MA 1824', '202-555-0154'),
  (6, '591 Memorial Dr, Chicopee MA 1020', '202-555-0141'),
  (7, '55 Brooksby Village Way, Danvers MA 1923', '202-555-0196'),
  (8, '137 Teaticket Hwy, East Falmouth MA 2536', '202-555-0167');
```

Start your Express Sweet app at `http://localhost:3000/`.

```bash
npm start;
```

## License

[MIT](LICENSE)
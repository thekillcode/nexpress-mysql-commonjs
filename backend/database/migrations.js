const db = require('./mysql-connention');

(async () => {
  const [roleTabe] = await db.query(`CREATE TABLE IF NOT EXISTS roles(
	id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
 name VARCHAR(191) NOT NULL UNIQUE,
 slug VARCHAR(191) NOT NULL UNIQUE,
 created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
 updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP)`);

  const [userTable] = await db.query(`CREATE TABLE IF NOT EXISTS users(
id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
 username VARCHAR(191) NOT NULL UNIQUE,
 email VARCHAR(191) NOT NULL UNIQUE,
 password VARCHAR(191) NOT NULL,
 role_id BIGINT UNSIGNED,
 status TINYINT UNSIGNED DEFAULT 1,
 created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
 updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP)`);

  const [alterUserTable] = await db.query(`ALTER TABLE users
ADD FOREIGN KEY (role_id) REFERENCES roles(id)`);

  console.log(roleTabe);
  console.log(userTable);
  console.log(alterUserTable);

  db.end();
})();

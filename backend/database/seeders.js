const _ = require('lodash');
const db = require('./mysql-connention');
const hash = require('../utils/bcrypt.utils');

(async () => {
  const [roleSeeder] = await db.query(
    `INSERT INTO roles (name,slug) VALUES (?,?),(?,?)`,
    ['Admin', _.kebabCase('Admin'), 'User', _.kebabCase('User')]
  );
  const [getUserRole] = await db.query(`select id from roles where slug=?`, [
    'user',
  ]);
  const [getAdminRole] = await db.query(`select id from roles where slug=?`, [
    'admin',
  ]);
  const [userSeeder] = await db.query(
    `INSERT INTO users (username,email,password,role_id,status) VALUES (?,?,?,?,?),(?,?,?,?,?)`,
    [
      'admin',
      'admin@sample.com',
      await hash('password'),
      getAdminRole[0].id,
      1,
      'user',
      'user@sample.com',
      await hash('password'),
      getUserRole[0].id,
      1,
    ]
  );

  console.log(roleSeeder);
  console.log(userSeeder);
  db.end();
})();

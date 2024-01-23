const db = require('../database/mysql-connention');
const hashPassword = require('../utils/bcrypt.utils');
class User {
  constructor({ username, email, password, role }) {
    this.username = username;
    this.email = email;
    this.password = password;
    this.role = role;
  }
  static create({ username, email, password, role }) {
    return new Promise(async (resolve, reject) => {
      try {
        const [getRole] = await db.query(`select id from roles where slug=?`, [
          role,
        ]);
        const hashedPassword = await hashPassword(password);
        const [newUser] = await db.query(
          'INSERT INTO users (username,email,password,role_id,status) value (?,?,?,?,?)',
          [username, email, hashedPassword, getRole[0].id, 1]
        );
        const [fetchedUser] = await db.query(
          'select id,username,email,role_id,status from users where id=?',
          [newUser.insertId]
        );
        resolve(fetchedUser[0]);
      } catch (error) {
        reject(error);
      }
    });
  }
  static checkExistUser({ username = '', email = '' }) {
    return new Promise(async (resolve, reject) => {
      try {
        const [getUsers] = await db.query(
          `select id,username,email from users where username=? or email=?`,
          [username, email]
        );
        resolve(getUsers);
      } catch {
        resolve([]);
      }
    });
  }
  static singleQuery(query = '', values = []) {
    return new Promise(async (resolve, reject) => {
      try {
        const [queryResult] = await db.query(`${query}`, values);
        resolve(queryResult[0]);
      } catch {
        resolve({});
      }
    });
  }
}

module.exports = User;

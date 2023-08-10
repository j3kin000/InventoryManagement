import DatabaseManager from './database';

const tableName = 'User';

const sqlQuery = `CREATE TABLE IF NOT EXISTS ${tableName} (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  uid TEXT NOT NULL UNIQUE, 
  pin TEXT)`;

const db = new DatabaseManager(sqlQuery);

export type UserProps = {
  uid: string;
  pin: string;
};
export const POST_USER = async (data: UserProps) => {
  try {
    const sqlQuery = `INSERT INTO ${tableName} (uid, pin) VALUES (?, ?)`;
    const parameters: string[] = [data.uid, data.pin];
    const user = await db.execute(sqlQuery, parameters);
    console.log('user', user);
    return user;
  } catch (error) {
    return null;
  }
};

export const FETCH_USER = async (pin: string) => {
  try {
    const sqlQuery = `SELECT * FROM ${tableName} `;
    const parameters: string[] = [];
    const user = await db.execute(sqlQuery, parameters);
    console.log('user', user);
    return user;
  } catch (error) {
    return null;
  }
};

export const PUT_USER = async (data: UserProps) => {
  try {
    const sqlQuery = `UPDATE ${tableName} SET pin = ? WHERE uid = ? `;
    const parameters: string[] = [data.pin, data.uid];
    const user = await db.execute(sqlQuery, parameters);
    console.log('user', user);
    return user;
  } catch (error) {
    return null;
  }
};

export const DELETE_USER = async () => {
  try {
    const sqlQuery = `DELETE  FROM ${tableName} `;
    const parameters: string[] = [];
    const user = await db.execute(sqlQuery, parameters);
    console.log('user', user);
    return user;
  } catch (error) {
    return null;
  }
};

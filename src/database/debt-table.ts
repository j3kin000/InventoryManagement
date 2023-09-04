import {DebtProps} from '../store/debt/debt.types';
import DatabaseManager from './database';

const tableName = 'Debt';

const sqlQuery = `CREATE TABLE IF NOT EXISTS ${tableName} (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  inventoryUid INTEGER NOT NULL,
  uid TEXT NOT NULL UNIQUE,
  name TEXT,
  items LONGTEXT NOT NULL,
  createdAt TEXT,
  isPaid BOOLEAN
)`;

const db = new DatabaseManager(sqlQuery);

export const POST_DEBT = async (data: DebtProps) => {
  try {
    const sqlQuery = `INSERT INTO ${tableName}(inventoryUid, uid, name, items, createdAt, isPaid) VALUES (?, ?, ?, ?, ?, ?)`;
    const parameters: string[] = [
      data.inventoryUid,
      data.uid,
      data.name,
      JSON.stringify(data.items),
      data.createdAt,
      data.isPaid.toString(),
    ];
    const debt = await db.execute(sqlQuery, parameters);
    return debt;
  } catch (error) {
    return null;
  }
};

export const FETCH_DEBT = async (inventoryUid: string) => {
  try {
    const sqlQuery = `SELECT * FROM ${tableName} WHERE inventoryUid = ?`;
    const parameters: string[] = [inventoryUid];
    const debt: DebtProps[] = [];
    const result = await db.execute(sqlQuery, parameters);
    for (let i = 0; i < result.rows.length; i++) {
      let itemWithoutId = result.rows.item(0);
      debt.push(itemWithoutId);
    }
    const newArray = debt.map(obj => {
      let {id, ...newObj} = obj;
      newObj.items = JSON.parse(newObj.items);
      return newObj;
    });

    return newArray;
  } catch (error) {
    throw error;
  }
};

export const PUT_DEBT = async (data: DebtProps) => {
  try {
    const sqlQuery = `UPDATE ${tableName} SET name = ?, items = ?,  createdAt = ?, isPaid = ? WHERE uid = ?`;
    const parameters: string[] = [
      data.name,
      JSON.stringify(data.items),
      data.createdAt,
      data.isPaid.toString(),
      data.uid,
    ];
    const debt = await db.execute(sqlQuery, parameters);
    return debt;
  } catch (error) {
    return null;
  }
};

export const DELETE_DEBT = async (uid: string) => {
  try {
    const sqlQuery = `DELETE FROM  ${tableName} WHERE uid = ?`;
    const parameters: string[] = [uid];
    const debt = await db.execute(sqlQuery, parameters);
    return debt;
  } catch (error) {
    throw error;
  }
};

export const DELETE_ALL_DEBT = async () => {
  try {
    const sqlQuery = `DELETE FROM  ${tableName}`;
    const parameters: string[] = [];
    const debt = await db.execute(sqlQuery, parameters);
    return debt;
  } catch (error) {
    throw error;
  }
};

import DatabaseManager from './database';
import {InventoryProps} from './debt-table';

const tableName = 'Inventory';

const sqlQuery = `CREATE TABLE IF NOT EXISTS ${tableName} (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  uid TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  createdAt TEXT,
  isActive BOOLEAN
)`;

const db = new DatabaseManager(sqlQuery);
export type DatabaseResponse = {
  insertId: number | undefined;
  rows: {
    item: (index: number) => any; // You can replace 'any' with the appropriate type
    length: number;
    raw: (index: number) => any; // You can replace 'any' with the appropriate type
  };
  rowsAffected: number;
};

export const POST_INVENTORY = async (data: InventoryProps) => {
  try {
    console.log('tavle', data.uid);
    const sqlQuery = `INSERT INTO ${tableName}(uid, title, createdAt, isActive) VALUES (?, ?, ?, ?)`;
    const parameters: string[] = [
      data.uid,
      data.title,
      data.createdAt,
      data.isActive.toString(),
    ];
    const result: DatabaseResponse = await db.execute(sqlQuery, parameters);
    console.log('inventory', result);
    return result;
  } catch (error) {
    console.log('ERROR POSTINVENTORY', error);
    throw error;
  }
};

export const FETCH_INVENTORY = async () => {
  try {
    const sqlQuery = `SELECT * FROM ${tableName} `;
    const parameters: string[] = [];
    const result = await db.execute(sqlQuery, parameters);
    const inventory: InventoryProps[] = [];
    for (const item of result) {
      const {id, ...itemWithoutId} = item;
      inventory.push(itemWithoutId);
    }
    return inventory;
  } catch (error) {
    throw error;
  }
};

export const PUT_INVENTORY = async (data: InventoryProps) => {
  try {
    const sqlQuery = `UPDATE ${tableName} SET title = ?, createdAt = ?, isActive = ? WHERE uid = ?`;
    const parameters: string[] = [
      data.title,
      new Date().toISOString(),
      data.isActive.toString(),
      data.uid,
    ];
    const inventory = await db.execute(sqlQuery, parameters);
    console.log('inventory', inventory);
    return inventory;
  } catch (error) {
    return null;
  }
};

export const DELETE_INVENTORY = async (uid: string) => {
  try {
    const sqlQuery = `DELETE FROM  ${tableName} WHERE uid = ? `;
    const parameters: string[] = [uid];
    const inventory = await db.execute(sqlQuery, parameters);
    console.log('inventory DELETE_INVENTORY', inventory);
    return inventory;
  } catch (error) {
    return null;
  }
};

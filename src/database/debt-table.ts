import DatabaseManager from './database';

const tableName = 'Debt';

const sqlQuery = `CREATE TABLE IF NOT EXISTS ${tableName} (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  inventoryUid INTEGER NOT NULL,
  uid TEXT NOT NULL UNIQUE,
  items LONGTEXT NOT NULL,
  createdAt TEXT,
  isPaid BOOLEAN
)`;

const db = new DatabaseManager(sqlQuery);

export type InventoryProps = {
  uid: string;
  title: string;
  createdAt: string;
  isActive: boolean;
};

export const POST_INVENTORY = async (data: InventoryProps) => {
  try {
    const sqlQuery = `INSERT INTO ${tableName} VALUES (?, ?, ?, ?, ?, ?)`;
    const parameters: string[] = [
      data.uid,
      data.userUid,
      data.title,
      new Date().toISOString(),
      data.isActive.toString(),
    ];
    const inventory = await db.execute(sqlQuery, parameters);
    console.log('inventory', inventory);
    return inventory;
  } catch (error) {
    return null;
  }
};

export type FetchInventoryProps = {
  uid: string;
  userUid: string;
};
export const FETCH_INVENTORY = async (data: FetchInventoryProps) => {
  try {
    const sqlQuery = `SELECT * FROM ${tableName} WHERE uid = ? AND userUid = ?`;
    const parameters: string[] = [data.uid, data.userUid];
    const inventory = await db.execute(sqlQuery, parameters);
    console.log('inventory', inventory);
    return inventory;
  } catch (error) {
    return null;
  }
};

export const PUT_INVENTORY = async (data: InventoryProps) => {
  try {
    const sqlQuery = `UPDATE ${tableName} SET title = ?, createdAt = ?, isActive = ? WHERE uid = ? AND userUid = ?`;
    const parameters: string[] = [
      data.title,
      new Date().toISOString(),
      data.isActive.toString(),
      data.uid,
      data.userUid,
    ];
    const inventory = await db.execute(sqlQuery, parameters);
    console.log('inventory', inventory);
    return inventory;
  } catch (error) {
    return null;
  }
};

export const DELETE_INVENTORY = async (data: FetchInventoryProps) => {
  try {
    const sqlQuery = `DELETE FROM  ${tableName} WHERE uid = ? AND userUid = ?`;
    const parameters: string[] = [data.uid, data.userUid];
    const inventory = await db.execute(sqlQuery, parameters);
    console.log('inventory', inventory);
    return inventory;
  } catch (error) {
    return null;
  }
};

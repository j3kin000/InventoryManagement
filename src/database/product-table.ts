import DatabaseManager from './database';

const tableName = 'Inventory';

const sqlQuery = `CREATE TABLE IF NOT EXISTS Product (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  uid TEXT NOT NULL UNIQUE,
  inventoryUid TEXT NOT NULL,
  image LONGTEXT,
  createdAt TEXT NOT NULL,
  productName TEXT NOT NULL,
  stock INTEGER,
  originalPrice INTEGER
  salesPrice INTEGER
)`;

const db = new DatabaseManager(sqlQuery);

export type ProductProps = {
  uid: string;
  inventoryUid: string;
  image: string;
  createdAt: string;
  productName: string;
  stock: number;
  originalPrice: number;
  salesPrice: number;
};

export const POST_PRODUCT = async (data: ProductProps) => {
  try {
    const sqlQuery = `INSERT INTO ${tableName} VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    const parameters: string[] = [
      data.uid,
      data.inventoryUid,
      data.image,
      new Date().toISOString(),
      data.productName,
      data.stock.toString(),
      data.originalPrice.toString(),
      data.salesPrice.toString(),
    ];
    const inventory = await db.execute(sqlQuery, parameters);
    console.log('inventory', inventory);
    return inventory;
  } catch (error) {
    return null;
  }
};

export type FetchProductProps = {
  uid: string;
  inventoryUid: string;
};
export const FETCH_PRODUCT = async (data: FetchProductProps) => {
  try {
    const sqlQuery = `SELECT * FROM ${tableName} WHERE uid = ? AND inventoryUid = ?`;
    const parameters: string[] = [data.uid, data.inventoryUid];
    const inventory = await db.execute(sqlQuery, parameters);
    console.log('inventory', inventory);
    return inventory;
  } catch (error) {
    return null;
  }
};

export const PUT_PRODUCT = async (data: ProductProps) => {
  try {
    const sqlQuery = `UPDATE ${tableName} SET image = ?, createdAt = ?, productName = ?, stock = ? , originalPrice = ? , salesPrice = ?  WHERE uid = ? AND inventoryUid = ?`;
    const parameters: string[] = [
      data.image,
      new Date().toISOString(),
      data.productName,
      data.stock.toString(),
      data.originalPrice.toString(),
      data.salesPrice.toString(),
      data.uid,
      data.inventoryUid,
    ];
    const inventory = await db.execute(sqlQuery, parameters);
    console.log('inventory', inventory);
    return inventory;
  } catch (error) {
    return null;
  }
};

export const DELETE_PRODUCT = async (data: FetchProductProps) => {
  try {
    const sqlQuery = `DELETE FROM  ${tableName} WHERE uid = ? AND userUid = ?`;
    const parameters: string[] = [data.uid, data.inventoryUid];
    const inventory = await db.execute(sqlQuery, parameters);
    console.log('inventory', inventory);
    return inventory;
  } catch (error) {
    return null;
  }
};

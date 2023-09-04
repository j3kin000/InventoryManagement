import {ProductProps} from '../store/product/product.types';
import DatabaseManager from './database';

const tableName = 'Product';

const sqlQuery = `CREATE TABLE IF NOT EXISTS ${tableName} (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  uid TEXT NOT NULL UNIQUE,
  inventoryUid TEXT NOT NULL,
  image LONGTEXT,
  createdAt TEXT NOT NULL,
  productName TEXT NOT NULL,
  stock DOUBLE,
  originalPrice DOUBLE,
  salesPrice DOUBLE
)`;

const db = new DatabaseManager(sqlQuery);

export const POST_PRODUCT = async (data: ProductProps) => {
  try {
    const sqlQuery = `INSERT INTO ${tableName}(uid, inventoryUid, image, createdAt, productName, stock, originalPrice, salesPrice) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
    const parameters: string[] = [
      data.uid,
      data.inventoryUid,
      data.image,
      data.createdAt,
      data.productName,
      data.stock.toString(),
      data.originalPrice.toString(),
      data.salesPrice.toString(),
    ];
    const inventory = await db.execute(sqlQuery, parameters);
    return inventory;
  } catch (error) {
    throw error;
  }
};

export type FetchProductProps = {
  uid: string;
  inventoryUid: string;
};
export const FETCH_PRODUCT = async (inventoryUid: string) => {
  try {
    const sqlQuery = `SELECT * FROM ${tableName} WHERE inventoryUid = ?`;
    const parameters: string[] = [inventoryUid];
    const inventory: ProductProps[] = [];
    const result = await db.execute(sqlQuery, parameters);
    for (let i = 0; i < result.rows.length; i++) {
      let itemWithoutId = result.rows.item(0);
      inventory.push(itemWithoutId);
    }
    const newArray = inventory.map(obj => {
      let {id, ...newObj} = obj;
      return newObj;
    });

    return newArray;
  } catch (error) {
    throw error;
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
    return inventory;
  } catch (error) {
    throw error;
  }
};

export const DELETE_PRODUCT = async (uid: string) => {
  try {
    const sqlQuery = `DELETE FROM  ${tableName} WHERE uid = ?`;
    const parameters: string[] = [uid];
    const inventory = await db.execute(sqlQuery, parameters);
    return inventory;
  } catch (error) {
    throw error;
  }
};

export const DELETE_ALL_PRODUCT = async () => {
  try {
    const sqlQuery = `DELETE FROM  ${tableName}`;
    const parameters: string[] = [];
    const inventory = await db.execute(sqlQuery, parameters);
    return inventory;
  } catch (error) {
    throw error;
  }
};

import {SQLiteDatabase, openDatabase} from 'react-native-sqlite-storage';

export const getDBConnection = async () => {
  return openDatabase({name: 'todo-data.db', location: 'default'});
};

export const createTable = async (db: SQLiteDatabase) => {
  // create table if not exists
  const query = `CREATE TABLE IF NOT EXISTS ${tableName}(
          value TEXT NOT NULL
      );`;

  await db.executeSql(query);
};

enablePromise(true);

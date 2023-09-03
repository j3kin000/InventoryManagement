import {
  enablePromise,
  openDatabase,
  SQLiteDatabase,
} from 'react-native-sqlite-storage';

enablePromise(true);

const database_name = 'SalesStorage.db';
const database_version = '1.0';
const database_displayname = 'SQLite Sales Storage Database';
const database_size = 200000;
class DatabaseManager {
  private db!: SQLiteDatabase;
  private sqlQuery: string;
  constructor(sqlQuery: string) {
    this.sqlQuery = sqlQuery;
  }

  private async init(): Promise<SQLiteDatabase> {
    return new Promise(resolve => {
      openDatabase({
        name: 'sales-inventory.db',
        location: 'default',
      })
        .then(DB => {
          this.db = DB;
          this.db
            .transaction(tx => {
              tx.executeSql(this.sqlQuery);
            })
            .then(() => {})
            .catch(error => {
              throw error;
            });
          resolve(this.db);
        })
        .catch(error => {
          throw error;
        });
    });
  }
  private async closeDatabase(): Promise<void> {
    if (this.db) {
      this.db
        .close()
        .then(status => {})
        .catch(error => {
          throw error;
        });
    } else {
    }
  }
  public async execute(
    sqlQuery: string,
    parameters: string[] = [],
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      this.init()
        .then(() => {
          if (!this.db) return;
          this.db
            .transaction(tx => {
              tx.executeSql(sqlQuery, parameters).then(([_, results]) => {
                resolve(results);
              });
            })
            .then(() => {
              // this.closeDatabase();
            })
            .catch(err => {
              reject(err);
            });
        })
        .catch(err => {
          reject(err);
        });
    });
  }
}

export default DatabaseManager;

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
      console.log('Opening database ...');
      openDatabase({
        name: 'sales-inventory.db',
        location: 'default',
      })
        .then(DB => {
          this.db = DB;
          console.log('Database OPEN');
          this.db
            .transaction(tx => {
              tx.executeSql(this.sqlQuery);
            })
            .then(() => {
              console.log('Table created successfully');
            })
            .catch(error => {
              console.log('Error init 1 ', error);
            });
          resolve(this.db);
        })
        .catch(error => {
          console.log('Error init 2 ', error);
        });
    });
  }
  private async closeDatabase(): Promise<void> {
    if (this.db) {
      console.log('Closing DB');
      this.db
        .close()
        .then(status => {
          console.log('Database CLOSED');
        })
        .catch(error => {
          console.log('Database CLOSED error', error);
        });
    } else {
      console.log('Database was not OPENED');
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
                console.log('Successfully Added ', results);
                resolve(results);
              });
            })
            .then(() => {
              // this.closeDatabase();
            })
            .catch(err => {
              console.log('ERROR execute 1 ', err);
              reject(err);
            });
        })
        .catch(err => {
          console.log('ERROR execute 2', err);
          reject(err);
        });
    });
  }
}

export default DatabaseManager;

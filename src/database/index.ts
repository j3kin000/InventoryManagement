import * as SQLite from 'react-native-sqlite-storage';

SQLite.DEBUG(true);
SQLite.enablePromise(true);

const database_name = 'SalesStorage.db';
const database_version = '1.0';
const database_displayname = 'SQLite Sales Storage Database';
const database_size = 200000;

export default class Database {
  private db: SQLite.SQLiteDatabase | null = null;

  initDB(): Promise<SQLite.SQLiteDatabase> {
    return new Promise(resolve => {
      console.log('Plugin integrity check ...');
      SQLite.echoTest()
        .then(() => {
          console.log('Integrity check passed ...');
          console.log('Opening database ...');
          SQLite.openDatabase(
            database_name,
            database_version,
            database_displayname,
            database_size,
          )
            .then(DB => {
              this.db = DB;
              console.log('Database OPEN');
              this.db
                .executeSql('SELECT 1 FROM Product LIMIT 1')
                .then(() => {
                  console.log('Database is ready ... executing query ...');
                })
                .catch(error => {
                  console.log('Received error: ', error);
                  console.log('Database not yet ready ... populating data');
                  this.db
                    .transaction(tx => {
                      tx.executeSql(
                        'CREATE TABLE IF NOT EXISTS Product (prodId, prodName, prodDesc, prodImage, prodPrice)',
                      );
                    })
                    .then(() => {
                      console.log('Table created successfully');
                    })
                    .catch(error => {
                      console.log(error);
                    });
                });
              resolve(this.db);
            })
            .catch(error => {
              console.log(error);
            });
        })
        .catch(error => {
          console.log('echoTest failed - plugin not functional');
        });
    });
  }

  closeDatabase(): void {
    if (this.db) {
      console.log('Closing DB');
      this.db
        .close()
        .then(status => {
          console.log('Database CLOSED', status);
        })
        .catch(error => {
          console.log('Database CLOSED error', error);
        });
    } else {
      console.log('Database was not OPENED');
    }
  }

  listProduct(): Promise<any[]> {
    return new Promise(resolve => {
      const products: any[] = [];
      this.initDB()
        .then(() => {
          if (!this.db) return;
          this.db
            .transaction(tx => {
              tx.executeSql(
                'SELECT p.prodId, p.prodName, p.prodImage FROM Product p',
                [],
              ).then(([tx, results]) => {
                console.log('Query completed');
                var len = results.rows.length;
                for (let i = 0; i < len; i++) {
                  let row = results.rows.item(i);
                  console.log(
                    `Prod ID: ${row.prodId}, Prod Name: ${row.prodName}`,
                  );
                  const {prodId, prodName, prodImage} = row;
                  products.push({
                    prodId,
                    prodName,
                    prodImage,
                  });
                }
                console.log(products);
                resolve(products);
              });
            })
            .then(() => {
              this.closeDatabase();
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(err => {
          console.log(err);
        });
    });
  }

  productById(id: number): Promise<any> {
    console.log(id);
    return new Promise(resolve => {
      this.initDB()
        .then(() => {
          if (!this.db) return;
          this.db
            .transaction(tx => {
              tx.executeSql('SELECT * FROM Product WHERE prodId = ?', [
                id,
              ]).then(([tx, results]) => {
                console.log(results);
                if (results.rows.length > 0) {
                  let row = results.rows.item(0);
                  resolve(row);
                }
              });
            })
            .then(() => {
              this.closeDatabase();
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(err => {
          console.log(err);
        });
    });
  }

  addProduct(prod: {
    prodId: number;
    prodName: string;
    prodDesc: string;
    prodImage: string;
    prodPrice: number;
  }): Promise<any> {
    console.log('Adding product', prod.prodDesc);
    return new Promise(resolve => {
      this.initDB()
        .then(() => {
          if (!this.db) return;
          this.db
            .transaction(tx => {
              tx.executeSql('INSERT INTO Product VALUES (?, ?, ?, ?, ?)', [
                prod.prodId,
                prod.prodName,
                prod.prodDesc,
                prod.prodImage,
                prod.prodPrice,
              ]).then(([tx, results]) => {
                resolve(results);
              });
            })
            .then(() => {
              this.closeDatabase();
            })
            .catch(err => {
              console.log('ERROR ADDING');
              console.log(err);
            });
        })
        .catch(err => {
          console.log(err);
        });
    });
  }

  updateProduct(
    id: number,
    prod: {
      prodName: string;
      prodDesc: string;
      prodImage: string;
      prodPrice: number;
    },
  ): Promise<any> {
    return new Promise(resolve => {
      this.initDB()
        .then(() => {
          if (!this.db) return;
          this.db
            .transaction(tx => {
              tx.executeSql(
                'UPDATE Product SET prodName = ?, prodDesc = ?, prodImage = ?, prodPrice = ? WHERE prodId = ?',
                [
                  prod.prodName,
                  prod.prodDesc,
                  prod.prodImage,
                  prod.prodPrice,
                  id,
                ],
              ).then(([tx, results]) => {
                resolve(results);
              });
            })
            .then(() => {
              this.closeDatabase();
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(err => {
          console.log(err);
        });
    });
  }

  deleteProduct(id: number): Promise<any> {
    return new Promise(resolve => {
      this.initDB()
        .then(() => {
          if (!this.db) return;
          this.db
            .transaction(tx => {
              tx.executeSql('DELETE FROM Product WHERE prodId = ?', [id]).then(
                ([tx, results]) => {
                  console.log(results);
                  resolve(results);
                },
              );
            })
            .then(() => {
              this.closeDatabase();
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(err => {
          console.log(err);
        });
    });
  }
}

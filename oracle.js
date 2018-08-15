var oracledb      = require('oracledb');

var dbConfig = {
   user: 'nexweb',
   password: 'passw0rd',
   connectString: 'localhost/XE'
};

class Database {
    constructor( config ) {
        this.connection;
        this.dbConfig = config;
    }

    connect() {
              console.log('=============connect');
      return new Promise((resolve, reject) => {
        oracledb.getConnection( this.dbConfig )
        .then(conn => resolve(conn))
        .catch(err => reject(err))
      });
    }

    query( sql, args ) {
        return new Promise( ( resolve, reject ) => {
            oracledb.getConnection( this.dbConfig )
            .then(connection => {
              this.connection = connection;
              connection.execute( sql, args, { outFormat: oracledb.OBJECT }, ( err, rows ) => {
                  if ( err )
                      return reject( err );
                  resolve( rows );
                  connection.close(
                  function(err) {
                    if (err) {
                      console.error(err.message);
                      reject(err)
                    }
                  });
              } );
            })

        } );
    }

    update( sql, args ) {
        return new Promise( ( resolve, reject ) => {
            if (!this.connection) {
              oracledb.getConnection( this.dbConfig )
              .then(connection => {
                this.connection = connection;
                connection.execute( sql, args,  ( err, rows ) => {
                    if ( err )
                        return reject( err );
                    resolve( rows );
                } );
              })
            } else {
              this.connection.execute( sql, args,  ( err, rows ) => {
                  if ( err )
                      return reject( err );
                  resolve( rows );
              } );
            }
        } );
    }

    /*
    * commit changed data.
    */
    commit() {
      this.connection.commit();
    }

    /*
    * rollback changed data.
    */
    rollback() {
      this.connection.rollback();
    }

    /*
    * close connection
    */
    close() {
        return new Promise( ( resolve, reject ) => {
          this.connection.close(function (err) {
            if (err)
              return reject( err );
            resolve();
          });
        } );
    }
}

const db = new Database(dbConfig);
let args = ['123456'];
db.query( 'SELECT col1, col2, col3 FROM test ')
    .then( rows => console.log('select col1:',rows) )
    .then( rows => console.log('select col1:',rows) )
    .catch( err => console.log('error=>', err))
let input1 = {
  col1 : '12',
  col2 : 'kildong',
  col3 : 'col1'
}

let input = {
  col1 : '123',
  col2 : 'kildong',
  col3 : 'col2'
}
db.update( 'insert into test (col1, col2, col3) values(:col1, :col2, :col3)', input1)
    .then( rows => console.log('insert rows col1:',rows) )
    .then(() => db.commit() && db.close());

const sql = 'insert into test (col1, col2, col3) values(:col1, :col2, :col3)';
db.connect()
    .then(conn => {
      console.log('connect=======>')
      conn.execute( sql, input, { outFormat: oracledb.OBJECT }, ( err, rows ) => {
        if ( err )
            console.log( err );
        console.log( rows );
        conn.commit();
      });
      conn.execute( sql, input, { outFormat: oracledb.OBJECT }, ( err, rows ) => {
        if ( err )
            console.log( err );
        console.log( rows );
        conn.commit();
      });
    })
// db.update( 'insert into test (col1, col2, col3) values(:col1, :col2, :col3)', input)
//     .then( rows => console.log('rows col2:',rows) )
//     .then(() => db.update( 'insert into test (col1, col2, col3) values(:col1, :col2, :col3)', input1))
//     .then(() => db.commit() && db.close())
//     .catch( err => console.log('error=>', err))

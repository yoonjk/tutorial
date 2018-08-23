var oracledb      = require('oracledb');

var dbconfig = {
   user: 'nexweb',
   password: 'passw0rd',
   connectString: 'localhost/XE' };

class Database {
    constructor( config ) {
        this.connection;
        this.dbConfig = config;
    }

    get DATE() {
        return oracledb.DATE;
    }

    get BLOB() {
        return oracledb.BLOB;
    }

    get CLOB() {
        return oracledb.CLOB;
    }

    get NUMBER() {
        return oracledb.NUMBER;
    }

    get STRING() {
        return oracledb.STRING;
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

              if (args) {
                connection.execute( sql, args, ( err, rows ) => {
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
                }); //execute
             } else {
                connection.execute( sql, ( err, rows ) => {
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
                }); //execute
              }
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

    executeMany( sql, args, options, cb ) {
            if (!this.connection) {
              oracledb.getConnection( this.dbConfig )
              .then(connection => {
                this.connection = connection;
                connection.executeMany( sql, args,  options, ( err, result ) => {
                    if ( err )
                        return cb( err );
                    cb( err, {rows : result, conn: connection} );
                } );
              })
            } else {
              this.connection.executeMany( sql, args, options, ( err, result ) => {
                  if ( err )
                      return cb( err );
                  cb(err, {rows: result, conn: connection} );
              } );
            }
    }    

    /*
    * commit changed data.
    */
    commit() {
      return new Promise((resolve, reject)=>{
        this.connection.commit(err => {
            if (err) 
              return reject(err)
            resolve();
        });
      })
    }

    /*
    * rollback changed data.
    */
    rollback() {
      return new Promise((resolve, reject)=>{
        this.connection.rollback(err => {
            if (err) 
              return reject(err)
            resolve();
        });
      })
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


module.exports = new Database(dbconfig);

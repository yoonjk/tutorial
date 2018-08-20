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


module.exports = new Database(dbconfig);

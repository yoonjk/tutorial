var mysql      = require('mysql');

var dbConfig = {
   host: 'localhost',
   user: 'nexweb',
   password: 'password',
   port: 3306,
   database: 'blockchain',
   connectionLimit : 50
};

class Database {
    constructor( config ) {
        this.connection = mysql.createConnection( config );
    }
    query( sql, args ) {
        return new Promise( ( resolve, reject ) => {
            this.connection.query( sql, args, ( err, rows ) => {
                if ( err )
                    return reject( err );
                resolve( rows );
            } );
        } );
    }
    close() {
        return new Promise( ( resolve, reject ) => {
            this.connection.end( err => {
                if ( err )
                    return reject( err );
                resolve();
            } );
        } );
    }
}

const db = new Database(dbConfig);
const args = ['123456', 'col'];
db.query( 'SELECT * FROM test where col1 = ? and col3 = ?', args)
    .then( rows => console.log('rows:',rows) )
    .then( () => db.close() );

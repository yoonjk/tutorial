
const db = require('./oracle');
let args = ['123456'];
db.query( 'SELECT col1, col2, col3 FROM test ')
    .then( rows => console.log('select col1:',rows) )
    .then( rows => console.log('select col1:',rows) )
    .catch( err => console.log('error=>', err))

/*
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
*/

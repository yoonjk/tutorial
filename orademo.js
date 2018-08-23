
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


var sql = "INSERT INTO test VALUES (:a, :b, :c)";

  var binds = [
    { a: "1", b: "Test 1 (One)", c: "test1" },
    { a: "2", b: "Test 2 (Two)" , c: "test2"},
    { a: "3", b: "Test 3 (Three)" , c: "test3"},

    { a: "5", b: "Test 5 (Five)" , c: "test5"}
  ];

  // bindDefs is optional for IN binds but it is generally recommended.
  // Without it the data must be scanned to find sizes and types.
  var options = {
    autoCommit: false,
    bindDefs: {
      a: { type: db.STRING, maxSize:15 },
      b: { type: db.STRING, maxSize:15  },
      c: { type: db.STRING, maxSize:15 }
    } };

    // db.connect().
    // then(conn => {
    //   conn.executeMany(sql, binds, options, function (err, result) {
    //     if (err)
    //       console.log(err)
    //     else {
    //       console.log("Result is:", result);
    //      // return cb(null, conn);
    //     }
    //   });
    // })
    
    db.executeMany(sql, binds, options, function (err, result) {
        if (err)
          console.log(err)
        else {
          console.log("Result is:", result.rows);
          result.conn.commit(err => console.log(err))
         // return cb(null, conn);
        }
    })
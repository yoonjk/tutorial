  
  var pbewithmd5anddes = require('./pbe')
  var password = 'nexweb';
  var iterations = 19;
  //var salt = new Buffer('32121F055C39F5A75','hex');
  var salt = new Buffer('d99bce325735e303','hex');
  console.log('salt:', salt);
  pbewithmd5anddes.encrypt('test',password,salt,iterations,function(err,msg) {
    console.log('encrypted: ' + msg);
    // eat your own dogfood
    pbewithmd5anddes.decrypt(msg,password,salt,iterations,function(err,msg) {
      console.log('decrypted: ' + msg);
    });
  });

  
  /*
  public String Encrypted(String plainText) {
    //Key generation for enc and desc
    KeySpec keySpec = new PBEKeySpec(key.toCharArray(), salt, iterationCount);
    SecretKey scr_key = SecretKeyFactory.getInstance("PBEWithMD5AndDES").generateSecret(keySpec);
    // Prepare the parameter to the ciphers
    AlgorithmParameterSpec paramSpec = new PBEParameterSpec(salt, iterationCount);

    //Enc process
    ecipher = Cipher.getInstance(scr_key.getAlgorithm());
    ecipher.init(Cipher.ENCRYPT_MODE, scr_key, paramSpec);
    String charSet = "UTF-8";
    byte[] in = plainText.getBytes(charSet);
    byte[] out = ecipher.doFinal(in);
    String encStr = new sun.misc.BASE64Encoder().encode(out);

    return encStr
  }
  */
  
  const pbewithmd5anddes = require('./pbe')
  const password = 'nexweb';
  const iterations = 19;
  //var salt = new Buffer('32121F055C39F5A75','hex');
  //var salt = new Buffer('d99bce325735e303','hex');
  //var salt = new Buffer('d99bce325735e303','hex');
  const salt = Buffer.from([0xD9, 0x9B,0xce,0x32,
  0x57, 0x35, 0xE3,0x03]);

  let plainText = process.argv[2];
  
  if (!plainText) {
    plainText = 'test';
  }
  pbewithmd5anddes.encrypt(plainText, password, salt, iterations)
  .then(msg =>{
    console.log('encrypted: ' + msg);
    // eat your own dogfood
    pbewithmd5anddes.decrypt(msg, password, salt, iterations)
    .then(msg=>{
      console.log('decrypted: ' + msg);
    });
  });

/*
package demo;

import java.io.UnsupportedEncodingException;
import java.security.InvalidAlgorithmParameterException;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.security.spec.AlgorithmParameterSpec;
import java.security.spec.InvalidKeySpecException;
import java.security.spec.KeySpec;
import java.util.Base64;

import javax.crypto.BadPaddingException;
import javax.crypto.Cipher;
import javax.crypto.IllegalBlockSizeException;
import javax.crypto.NoSuchPaddingException;
import javax.crypto.SecretKey;
import javax.crypto.SecretKeyFactory;
import javax.crypto.spec.PBEKeySpec;
import javax.crypto.spec.PBEParameterSpec;

public class Demo {
	private final String key = "nexweb";
	private Cipher ecipher, dcipher;
	//d99bce325735e303
	private final byte[] salt = {
	    (byte) 0xD9, (byte) 0x9B, (byte) 0xce, (byte) 0x32,
	    (byte) 0x57, (byte) 0x35, (byte) 0xE3, (byte) 0x03
	};
	private final int iterationCount = 19;

	public String Encrypted(String plainText) {
	    if (plainText != null && !plainText.isEmpty()) {
	        try {
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
	            String encStr = Base64.getEncoder().encodeToString(out);
	            return encStr;
	        } catch (Exception e) {
	          e.printStackTrace();
	        }
	    }
	    return null;
	}
	public static void main(String[] args) {
		Demo demo = new Demo();
		System.out.println("demo=>" + demo.Encrypted("passw0rd"));
		//gVv9l2OXUXw=
		//gVv9l2OXUXw=
	}
}
*/
  
  const pbewithmd5anddes = require('./pbe')
  const password = 'pwkey';
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

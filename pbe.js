"use strict";

/*
 * Emulates Java's PBEWITHMD5ANDDES for node.js
 */
const crypto = require('crypto');

/*
* KDF
*/
const KDF= (password,salt,iterations) =>{
    const pwd = new Buffer(password,'utf-8');
    let key = Buffer.concat([pwd, salt]);
    let i;

    for (i = 0; i < iterations; i+=1) {
      key = crypto.createHash("md5").update(key).digest();
    }
    return key;
}

/*
* getKeyIV
*/
const getKeyIV= (password,salt,iterations) =>{
    const key = KDF(password,salt,iterations);
    const keybuf = new Buffer(key,'binary').slice(0,8);
    const ivbuf = new Buffer(key,'binary').slice(8,16);

    return [ keybuf, ivbuf ];
}

/*
* encrypt
*/
const encrypt=(payload,password,salt,iterations)=>{

    const kiv = getKeyIV(password,salt,iterations);
    const cipher = crypto.createCipheriv('des', kiv[0],kiv[1]);
    const encrypted = [];
  
    return new Promise((resolve, reject) => {
        try {
            encrypted.push(cipher.update(payload,'utf-8','hex'));
            encrypted.push(cipher.final('hex'));

            return resolve(new Buffer(encrypted.join(''),'hex').toString('base64'));
        } catch (err) {
            reject(err)
        }
    })
}

/*
* decrypt
*/
const decrypt=(payload,password,salt,iterations) =>{
    const encryptedBuffer = new Buffer(payload,'base64');
    const kiv = getKeyIV(password,salt,iterations);
    const decipher = crypto.createDecipheriv('des', kiv[0],kiv[1]);
    const decrypted = [];

    return new Promise((resolve, reject) => {
        try {
            decrypted.push(decipher.update(encryptedBuffer));
            decrypted.push(decipher.final());
    
            return resolve(decrypted.join(''));
        } catch (err) {
            reject(err)
        }
    })
}

module.exports = {
    KDF: KDF,
    getKeyIV: getKeyIV,
    encrypt: encrypt,
    decrypt: decrypt,
};
"use strict";

/*
 * Emulates Java's PBEWITHMD5ANDDES for node.js
 */
const crypto = require('crypto');

//let pbewithmd5anddes = {

const KDF= (password,salt,iterations) =>{
    var pwd = new Buffer(password,'utf-8');
    var key = Buffer.concat([pwd, salt]);
    var i;
    for (i = 0; i < iterations; i+=1) {
      key = crypto.createHash("md5").update(key).digest();
    }
    return key;
}

const getKeyIV= (password,salt,iterations) =>{
    var key = KDF(password,salt,iterations);
    var keybuf = new Buffer(key,'binary').slice(0,8);
    var ivbuf = new Buffer(key,'binary').slice(8,16);
    return [ keybuf, ivbuf ];
}

const encrypt=(payload,password,salt,iterations,cb)=>{
    var kiv = getKeyIV(password,salt,iterations);
    var cipher = crypto.createCipheriv('des', kiv[0],kiv[1]);
    var encrypted = [];
    encrypted.push(cipher.update(payload,'utf-8','hex'));
    encrypted.push(cipher.final('hex'));
    return cb(undefined,new Buffer(encrypted.join(''),'hex').toString('base64'));
}

const decrypt=(payload,password,salt,iterations,cb) =>{
    var encryptedBuffer = new Buffer(payload,'base64');
    var kiv = getKeyIV(password,salt,iterations);
    var decipher = crypto.createDecipheriv('des', kiv[0],kiv[1]);
    var decrypted = [];
    decrypted.push(decipher.update(encryptedBuffer));
    decrypted.push(decipher.final());
    return cb(undefined, decrypted.join(''));
}


module.exports = {
    KDF: KDF,
    getKeyIV: getKeyIV,
    encrypt: encrypt,
    decrypt: decrypt,
};
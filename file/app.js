const fs = require('fs');
const readline = require('readline');
const stream = require('stream');
const filename = process.argv[2];
const instream = fs.createReadStream(filename);
const outstream = new stream;
const rl = readline.createInterface(instream, outstream);
let lineNo = 0;
rl.on('line', function(line) {
  lineNo++;
  // process line here
  console.log(`${lineNo}:${line}`);
});

rl.on('close', function() {
  // do something on finish here
  console.log('end of file')
});

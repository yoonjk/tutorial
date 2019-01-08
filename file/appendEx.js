const fs = require('fs');
const filename = process.argv[2];


fs.appendFileSync('./message.txt', 'data to append\n');
fs.appendFileSync('./message2.txt', 'data to append\n');
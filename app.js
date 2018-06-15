const express = require('express');
const cfenv = require('cfenv');
require('dotenv').config();
const http = require('http');
const app = express();
const server = http.createServer(app)
const appEnv = cfenv.getAppEnv();
const PORT = process.env.PORT || appEnv.port;
app.use(express.static(__dirname + '/public/'))
server.listen(PORT , () => {
  console.log('port:', PORT)
  console.log('server starting on ' + appEnv.url);
})
console.log('process env:', PORT)
require('./action');

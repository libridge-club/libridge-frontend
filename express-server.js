const express = require('express');
const https = require('https');
const fs = require('fs');
const path = require('path');

const keyLocation = import.meta.env.KEY_LOCATION
const certLocation = import.meta.env.CERT_LOCATION
const options = {
  key: fs.readFileSync(keyLocation),
  cert: fs.readFileSync(certLocation)
};

// Create a service (the app object is just a callback).
const app = express();
const httpsPort = 443

const basePath = "/dist"


app.use(express.static(path.join(__dirname, basePath)));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, basePath + '/index.html'));
})

console.log("creating server");
https.createServer(options, app).listen(httpsPort);
console.log("last line");

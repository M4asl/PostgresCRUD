const express = require('express');
const app = express();
const pool = require('./db');

app.listen(3333, () => {
  console.log('server is listening on port 3333');
});

//import express from 'express';
var express = require('express');

const app = express();
app.use(express.json());

const port = 4567;

app.post('/payload', (req, res) => {
  console.log(req.body);

  res.send('Processed');
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})

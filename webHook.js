import express from 'express';
//import bodyParser from 'body-parser';

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

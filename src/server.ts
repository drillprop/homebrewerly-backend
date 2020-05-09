import * as express from 'express';
import * as bodyParser from 'body-parser';

const app = express();

app.use(bodyParser.json());

app.get('', (req, res) => {
  res.send('Hello from server');
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`server started at port ${PORT}`);
});

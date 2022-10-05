import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import { network } from './config.js';
import itemRouter from './router/item.js';
import countRouter from './router/count.js';

const app = express();

app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(morgan('tiny'));

app.use('/', itemRouter);
app.use('/count', countRouter);

app.use((req, res, next) => {
  res.sendStatus(404);
});

app.use((err, req, res, next) => {
  console.error(err);
  res.sendStatus(500);
});

app.listen(network.port, () => {
  console.log(`port ${network.port}`);
});

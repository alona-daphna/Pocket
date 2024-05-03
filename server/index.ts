import express, { Express } from 'express';
import EntryRouter from './routes/entries';
import './dbConnecton';

const app: Express = express();
const port = process.env.PORT || 4000;

app.use(express.json());

app.use('/entries', EntryRouter);

app.listen(port, () => {
  console.log(`server running on port ${port}`);
});

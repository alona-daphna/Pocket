import express, { Express } from 'express';
import EntryRouter from './routes/entries';
import './dbConnecton';
import cors from 'cors';

const app: Express = express();
const port = process.env.PORT || 4000;

app.use(express.json());
app.use(
  cors({
    origin: 'https://pocket-alonas-projects-1abb53b5.vercel.app',
    methods: ['GET', 'POST', 'DELETE', 'PATCH'],
    allowedHeaders: '*',
  })
);

app.use('/entries', EntryRouter);

app.listen(port, () => {
  console.log(`server running on port ${port}`);
});

import 'reflect-metadata'

import express from 'express';
4
import routes from './app/routes'

const app = express();

import './database'

app.use(express.json())

app.use(routes);// Rotas

app.listen(3333, () => {
  console.log(`~ server running on port ${3333}`);
});

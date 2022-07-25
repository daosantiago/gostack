import 'reflect-metadata';

import express from 'express';
import routes from './routes';
import uploadCondig from './config/upload';

import './database';

const app = express();

app.use(express.json());
app.use('/files', express.static(uploadCondig.directory));
app.use(routes);

app.listen(3333, () => {
  console.log('');
  console.log('🚀 Server is listening on http://localhost:3333');
});

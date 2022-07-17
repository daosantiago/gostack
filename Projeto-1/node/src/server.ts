import express, { application } from 'express';

const app = express();

app.get('/', (request, response) => {
  return response.json({message: 'Hello'});
});

app.listen(3333, () => {
  console.log('🚀 Server is listening on http://localhost:3333');
});

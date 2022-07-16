import express, { application } from 'express';

const app = express();

app.get('/', (request, response) => {
  console.log('chegou');

  return response.json({message: 'Hello'});
});

application.listen(3333, () => {
  console.log('🚀 Server is listening on http://localhost:3333');
});

import { Request, Response } from 'express';
import createUser from './services/CreateUser';

export function helloWorld(request: Request, response: Response) {
  const user = createUser({
    name: 'Anderson',
    email: 'daosantiago@gmail.com',
    password: 'asdasd123',
    list: ['Primeiro', 'Segundo'],
    techs: [
      'Node.js',
      'Python',
      { title: 'Javascript', experience: 15 },
      { title: 'Java', experience: 20 },
    ]
  });

  return response.json({ message: 'Hello World' });
}
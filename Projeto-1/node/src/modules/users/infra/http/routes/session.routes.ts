import { Router } from 'express';

import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';
import User from '@modules/users/infra/typeorm/entities/User';
import UsersRepository from '../../typeorm/repositories/UsersRepository';

const sessionsRouter = Router();

sessionsRouter.post('/', async (request, response) => {
  const { email, password } = request.body;
  const usersRepository = new UsersRepository();

  const authenticateUser = new AuthenticateUserService(usersRepository);

  const { user, token } = await authenticateUser.execute({ email, password });

  // Solution to delete found in https://bobbyhadz.com/blog/typescript-operand-of-delete-operator-must-be-optional
  const loggedUser: Partial<Pick<User, 'password'>> & Omit<User, 'password'> =
    user;

  // (property) User.password: string
  // The operand of a 'delete' operator must be optional.ts(2790)
  // Solution above

  delete loggedUser.password;

  return response.json({ user, token });
});

export default sessionsRouter;

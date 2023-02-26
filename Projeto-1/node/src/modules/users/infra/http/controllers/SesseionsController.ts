// index, show, create, update, delete
import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import User from '../../typeorm/entities/User';

interface LoggedUser {
  id: string;
  name: string;
  email: string;
  password?: string;
  avatar: string;
  created_at: Date;
  updated_at: Date;
}

export default class SessionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const authenticateUser = container.resolve(AuthenticateUserService);

    const { user, token } = await authenticateUser.execute({ email, password });

    // Solution to delete found in https://bobbyhadz.com/blog/typescript-operand-of-delete-operator-must-be-optional
    // const loggedUser: Partial<Pick<User, 'password'>> & Omit<User, 'password'> =
    //   user;
    const loggedUser: LoggedUser = user;

    // (property) User.password: string
    // The operand of a 'delete' operator must be optional.ts(2790)
    // Solution above

    delete loggedUser.password;

    // return response.json({ loggedUser, token });
    return response.json({ user, token });
  }
}

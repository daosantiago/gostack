import { Router } from "express";

import AuthenticateUserService from "../services/AuthenticateUserService";
import User from "../models/User";

const sessionsRouter = Router();

sessionsRouter.post('/', async (request, response) => {
  try {
    const { email, password } = request.body;

    const authenticateUser = new AuthenticateUserService();

    const { user } = await authenticateUser.execute({ email, password });

    // Solution to delete found in https://bobbyhadz.com/blog/typescript-operand-of-delete-operator-must-be-optional
    const loggedUser: Partial<Pick<User, 'password'>> & Omit<User, 'password'> = user;

    // (property) User.password: string
    // The operand of a 'delete' operator must be optional.ts(2790)
    // Solution above

    delete loggedUser.password;

    return response.json({ user });
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default sessionsRouter;

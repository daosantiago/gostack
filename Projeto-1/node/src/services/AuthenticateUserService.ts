import { getRepository } from 'typeorm';
import { compare, hash } from 'bcryptjs'

import User from '../models/User';


interface RequestDTO {
  email: string;
  password: string;
}

class AuthenticateUserService {
  public async execute({ email, password }: RequestDTO): Promise<{ user: User }> {
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne({ where: { email } });

    if (!user) {
      throw new Error('Incorrect email/password combination.');
    }

    // user.password  - Senha criptografada
    // passwrod - Senha não criptografada
    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) {
      throw new Error('Incorrect email/password combination.');
    }

    // Usuário autenticado
    return {
      user,
    }

  }
}

export default AuthenticateUserService;

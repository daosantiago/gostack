import { getRepository } from 'typeorm';
import { compare, hash } from 'bcryptjs'
import { sign } from 'jsonwebtoken';

import User from '../models/User';


interface RequestDTO {
  email: string;
  password: string;
}

class AuthenticateUserService {
  public async execute({ email, password }: RequestDTO): Promise<{ user: User, token: string }> {
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

    const token = sign({}, '5ce8ccee7e3efd87df12af32c00cea18', { //MD5 aleatório gerado online
      subject: user.id,
      expiresIn: '1d',
    });

    return {
      user,
      token,
    }

  }
}

export default AuthenticateUserService;

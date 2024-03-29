import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import User from '../infra/typeorm/entities/User';
import IUsersRepository from '../repositories/IUsersRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

interface IRequestDTO {
  name: string;
  email: string;
  password: string;
}

interface IResponse {
  user: User;
  token: string;
}

@injectable()
class CreateUserService {
  // Coloca um private antes da variável pra não precisar criar antes
  // Assim uma variável é criada automaticamente. Pode usar this.appointmentsRepository
  // Desativado a regra "no-useless-constructor": "off",
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({
    name,
    email,
    password,
  }: // }: IRequestDTO): Promise<IResponse> { Não é permitido retornar um usuário diferente do DTO de usuário
  IRequestDTO): Promise<Omit<User, 'password'>> {
    const checkUserExists = await this.usersRepository.findByEmail(email);

    if (checkUserExists) {
      throw new AppError('Email addres has been already used');
    }

    const hashedPassword = await this.hashProvider.generatedHash(password);

    const user = await this.usersRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    // // Solution to delete found in https://bobbyhadz.com/blog/typescript-operand-of-delete-operator-must-be-optional
    // const savedUser: Partial<Pick<User, 'password'>> & Omit<User, 'password'> =
    //   user;

    // // (property) User.password: string
    // // The operand of a 'delete' operator must be optional.ts(2790)
    // // Solution above
    // delete savedUser.password;

    return user;
  }
}

export default CreateUserService;

import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs'

import User from '../models/User';

interface RequestDTO {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  public async execute({ name, email, password }: RequestDTO): Promise<Omit<User, 'password'>> {
    const usersRepository = getRepository(User);

    const checkUserExists = await usersRepository.findOne({
      where: { email },
    });

    if (checkUserExists) {
      throw new Error('Email addres has been already used')
    }

    const hashedPassword = await hash(password, 8);

    const user = usersRepository.create({
      name, email, password: hashedPassword
    });

    await usersRepository.save(user);

    // Solution to delete found in https://bobbyhadz.com/blog/typescript-operand-of-delete-operator-must-be-optional
    const savedUser: Partial<Pick<User, 'password'>> & Omit<User, 'password'> = user;

    // (property) User.password: string
    // The operand of a 'delete' operator must be optional.ts(2790)
    // Solution above
    delete savedUser.password;

    return savedUser;
  }
}

export default CreateUserService;

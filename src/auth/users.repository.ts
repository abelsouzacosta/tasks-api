import { EntityRepository, Repository } from 'typeorm';
import { CreateUserDto } from './dtos/create-user.dto';
import { User } from './user.entity';

@EntityRepository(User)
export class UsersRepository extends Repository<User> {
  async createUser({ username, password }: CreateUserDto): Promise<void> {
    const user = this.create({
      username,
      password,
    });

    await this.save(user);
  }

  async findOneUserByUsername(username: string): Promise<User> {
    const user = await this.findOne({
      where: {
        username,
      },
    });

    return user;
  }
}

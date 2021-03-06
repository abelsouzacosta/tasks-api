import { EntityRepository, Repository } from 'typeorm';
import { AuthCredentialsDto } from './dtos/auth-credentials-dto';
import { User } from './user.entity';

@EntityRepository(User)
export class UsersRepository extends Repository<User> {
  async createUser({ username, password }: AuthCredentialsDto): Promise<void> {
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

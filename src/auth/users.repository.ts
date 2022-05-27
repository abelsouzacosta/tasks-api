import { EntityRepository, Repository } from 'typeorm';
import { CreateUserDto } from './dtos/create-user.dto';
import { User } from './user.entity';
import { hash } from 'bcrypt';

@EntityRepository(User)
export class UsersRepository extends Repository<User> {
  async createUser({ username, password }: CreateUserDto): Promise<void> {
    const hashedPassword = await hash(password, 10);

    const user = this.create({
      username,
      password: hashedPassword,
    });

    await this.save(user);
  }
}

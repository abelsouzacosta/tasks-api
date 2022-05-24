import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dtos/create-user.dto';
import { User } from './user.entity';
import { UsersRepository } from './users.repository';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UsersRepository)
    private userRepository: UsersRepository,
  ) {}

  private async getUserByUsername(username: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: {
        username,
      },
    });

    return user;
  }

  async createUser(body: CreateUserDto): Promise<void> {
    const userAlreadyExists = await this.getUserByUsername(body.username);

    if (userAlreadyExists) {
      throw new HttpException(`Duplicated username`, HttpStatus.CONFLICT);
    }

    await this.userRepository.createUser(body);
  }
}

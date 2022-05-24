import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersRepository } from './users.repository';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UsersRepository)
    private userRepository: UsersRepository,
  ) {}

  async createUser(body: CreateUserDto): Promise<void> {
    const user = this.userRepository.create({
      username: body.username,
      password: body.password,
    });

    await this.userRepository.save(user);
  }
}

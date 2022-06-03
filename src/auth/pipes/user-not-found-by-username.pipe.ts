import { Injectable, NotFoundException, PipeTransform } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from '../dtos/auth-credentials-dto';
import { UsersRepository } from '../users.repository';

@Injectable()
export class UserNotFoundByUsernamePipe implements PipeTransform {
  constructor(
    @InjectRepository(UsersRepository)
    private usersRepository: UsersRepository,
  ) {}

  async transform({ username, password }: AuthCredentialsDto) {
    const userWithUsername = await this.usersRepository.findOneUserByUsername(
      username,
    );

    if (!userWithUsername)
      throw new NotFoundException(`The user with username given was not found`);

    return { username, password };
  }
}

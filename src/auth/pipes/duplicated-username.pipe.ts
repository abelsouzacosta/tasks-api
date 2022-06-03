import {
  HttpException,
  HttpStatus,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from '../dtos/auth-credentials-dto';
import { UsersRepository } from '../users.repository';

@Injectable()
export class DuplicatedUsernamePipe implements PipeTransform {
  constructor(
    @InjectRepository(UsersRepository)
    private userRepository: UsersRepository,
  ) {}

  async transform({ username, password }: AuthCredentialsDto) {
    const foundUser = await this.userRepository.findOneUserByUsername(username);

    if (foundUser)
      throw new HttpException(`Username already taken`, HttpStatus.CONFLICT);

    return { username, password };
  }
}

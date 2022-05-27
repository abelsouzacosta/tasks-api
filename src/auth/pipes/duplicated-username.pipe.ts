import {
  HttpException,
  HttpStatus,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UsersRepository } from '../users.repository';

@Injectable()
export class DuplicatedUsernamePipe implements PipeTransform {
  constructor(private userRepository: UsersRepository) {}

  async transform({ username, password }: CreateUserDto) {
    const foundUser = await this.userRepository.findOneUserByUsername(username);

    if (foundUser)
      throw new HttpException(`Username already taken`, HttpStatus.CONFLICT);

    return { username, password };
  }
}

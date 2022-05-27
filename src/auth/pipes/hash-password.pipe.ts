import { Injectable, PipeTransform } from '@nestjs/common';
import { CreateUserDto } from '../dtos/create-user.dto';
import { genSalt, hash } from 'bcrypt';

@Injectable()
export class HashPasswordPipe implements PipeTransform {
  async transform({
    username,
    password,
  }: CreateUserDto): Promise<CreateUserDto> {
    const salt = await genSalt();
    const hashedPassword = await hash(password, salt);

    return {
      username,
      password: hashedPassword,
    };
  }
}

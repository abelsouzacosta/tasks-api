import { Injectable, PipeTransform } from '@nestjs/common';
import { AuthCredentialsDto } from '../dtos/auth-credentials-dto';
import { genSalt, hash } from 'bcrypt';

@Injectable()
export class HashPasswordPipe implements PipeTransform {
  async transform({
    username,
    password,
  }: AuthCredentialsDto): Promise<AuthCredentialsDto> {
    const salt = await genSalt();
    const hashedPassword = await hash(password, salt);

    return {
      username,
      password: hashedPassword,
    };
  }
}

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dtos/auth-credentials-dto';
import { UsersRepository } from './users.repository';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtPayloadInterface } from './interfaces/jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UsersRepository)
    private userRepository: UsersRepository,
    private jwtService: JwtService,
  ) {}

  async createUser(body: AuthCredentialsDto): Promise<void> {
    await this.userRepository.createUser(body);
  }

  async createSession(
    body: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    const user = await this.userRepository.findOneUserByUsername(body.username);

    const passwordIsValid = await compare(body.password, user.password);

    if (!passwordIsValid)
      throw new UnauthorizedException('Please check your login credentials');

    const tokenPayload: JwtPayloadInterface = { username: user.username };
    const accessToken: string = this.jwtService.sign(tokenPayload);

    return {
      accessToken,
    };
  }
}

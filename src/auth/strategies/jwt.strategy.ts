import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayloadInterface } from '../interfaces/jwt-payload.interface';
import { User } from '../user.entity';
import { UsersRepository } from '../users.repository';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(UsersRepository)
    private userRepository: UsersRepository,
  ) {
    super({
      secretOrKey: 'topSecret',
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload: JwtPayloadInterface): Promise<User> {
    const { username } = payload;

    const user = await this.userRepository.findOneUserByUsername(username);

    if (!user) throw new UnauthorizedException('User not authorized');

    return user;
  }
}

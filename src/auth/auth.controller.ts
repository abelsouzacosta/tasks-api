import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dtos/auth-credentials-dto';
import { DuplicatedUsernamePipe } from './pipes/duplicated-username.pipe';
import { HashPasswordPipe } from './pipes/hash-password.pipe';
import { UserNotFoundByUsernamePipe } from './pipes/user-not-found-by-username.pipe';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/singup')
  @UsePipes(new ValidationPipe(), DuplicatedUsernamePipe, HashPasswordPipe)
  async create(@Body() body: AuthCredentialsDto): Promise<void> {
    return this.authService.createUser(body);
  }

  @Post('/singin')
  @UsePipes(new ValidationPipe(), UserNotFoundByUsernamePipe)
  async login(
    @Body() body: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    return this.authService.createSession(body);
  }
}

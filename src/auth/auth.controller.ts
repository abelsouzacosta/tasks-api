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

@Controller('auth')
export class AuthController {
  constructor(private authSerVice: AuthService) {}

  @Post('/singup')
  @UsePipes(new ValidationPipe(), DuplicatedUsernamePipe, HashPasswordPipe)
  async create(@Body() body: AuthCredentialsDto): Promise<void> {
    return this.authSerVice.createUser(body);
  }
}

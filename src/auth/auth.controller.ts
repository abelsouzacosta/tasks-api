import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { DuplicatedUsernamePipe } from './pipes/duplicated-username.pipe';

@Controller('auth')
export class AuthController {
  constructor(private authSerVice: AuthService) {}

  @Post('/singup')
  @UsePipes(new ValidationPipe(), DuplicatedUsernamePipe)
  async create(@Body() body: CreateUserDto): Promise<void> {
    return this.authSerVice.createUser(body);
  }
}

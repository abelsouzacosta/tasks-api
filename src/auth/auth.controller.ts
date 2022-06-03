import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dtos/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/singup')
  @UsePipes(new ValidationPipe())
  async create(@Body() body: CreateUserDto): Promise<void> {
    return this.authService.createUser(body);
  }
}

import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(4, {
    message: 'Username should have at least 4 charaters',
  })
  @MaxLength(10, {
    message: 'Username should have maximum of 10 characters',
  })
  username: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6, {
    message: 'Password should have at least 6 characters',
  })
  password: string;
}

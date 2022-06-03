import {
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class AuthCredentialsDto {
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
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: `Password should contain at least 1 upper case letter, 1 lower case letter, 1 number or a special character`,
  })
  password: string;
}

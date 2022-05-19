import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(2, {
    message: 'The title of a task must have at least 2 characters',
  })
  @MaxLength(10, {
    message: 'The title of a task must be a maximum of 10 characters',
  })
  title: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(10, {
    message: 'The description of a task must have at least 10 characters',
  })
  description: string;
}

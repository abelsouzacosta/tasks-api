import { User } from 'src/auth/user.entity';

export class GetTaskByIdAndUserDto {
  id: string;

  user: User;
}

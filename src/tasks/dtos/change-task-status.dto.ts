import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { TaskStatus } from '../enums/task-status.enum.';

export class ChangeTaskStatusDto {
  @IsEnum(TaskStatus, {
    message: `Task Status should match enum: ${TaskStatus.DONE}, ${TaskStatus.IN_PROGRESS} or ${TaskStatus.OPEN}`,
  })
  @IsString({
    message: 'Task Status should be a string',
  })
  @IsNotEmpty({
    message: `Task Status should be not empty`,
  })
  status: TaskStatus;
}

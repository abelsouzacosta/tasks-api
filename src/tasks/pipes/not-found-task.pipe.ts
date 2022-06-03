import {
  HttpException,
  HttpStatus,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TasksRepository } from '../tasks.repository';

@Injectable()
export class NotFoundTaskPipe implements PipeTransform {
  constructor(
    @InjectRepository(TasksRepository)
    private taskRepository: TasksRepository,
  ) {}

  async transform(id: string) {
    const taskFound = await this.taskRepository.findOne({
      id,
    });

    if (!taskFound)
      throw new HttpException(
        `Any task was found with the given id`,
        HttpStatus.NOT_FOUND,
      );

    return id;
  }
}

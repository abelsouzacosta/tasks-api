import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dtos/create-task.dto';
import { TasksRepository } from './tasks.repository';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TasksRepository)
    private tasksRepository: TasksRepository,
  ) {}

  async create(data: CreateTaskDto): Promise<void> {
    const task = this.tasksRepository.create({
      title: data.title,
      description: data.description,
    });

    await this.tasksRepository.save(task);
  }
}

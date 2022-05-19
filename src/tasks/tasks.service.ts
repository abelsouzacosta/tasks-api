import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dtos/create-task.dto';
import { TasksRepository } from './tasks.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';

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

  async list(): Promise<Task[]> {
    return this.tasksRepository.find({});
  }
}

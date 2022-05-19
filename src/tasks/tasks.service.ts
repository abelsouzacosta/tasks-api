import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dtos/create-task.dto';
import { TasksRepository } from './tasks.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { UdpateTaskDto } from './dtos/update-task.dto';

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

  async getTask(id: string): Promise<Task> {
    return this.tasksRepository.findOne({
      where: {
        id,
      },
    });
  }

  async update(id: string, body: UdpateTaskDto): Promise<void> {
    const task = await this.tasksRepository.findOne({
      where: {
        id,
      },
    });

    task.title = body.title || task.title;
    task.description = body.description || task.description;

    await this.tasksRepository.save(task);
  }

  async delete(id: string): Promise<void> {
    const task = await this.tasksRepository.findOne({
      where: {
        id,
      },
    });

    await this.tasksRepository.remove(task);
  }
}

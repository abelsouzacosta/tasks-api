import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dtos/create-task.dto';
import { TasksRepository } from './tasks.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { UdpateTaskDto } from './dtos/update-task.dto';
import { GetTasksFilterDto } from './dtos/get-task-filter.dto';
import { ChangeTaskStatusDto } from './dtos/change-task-status.dto';
import { User } from 'src/auth/user.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TasksRepository)
    private tasksRepository: TasksRepository,
  ) {}

  async create(data: CreateTaskDto, user: User): Promise<void> {
    const task = this.tasksRepository.create({
      title: data.title,
      description: data.description,
      user,
    });

    await this.tasksRepository.save(task);
  }

  async list(user: User, filterDto?: GetTasksFilterDto): Promise<Task[]> {
    return this.tasksRepository.getTasks(user, filterDto);
  }

  async getTask(id: string, user: User): Promise<Task> {
    return this.tasksRepository.findOne({
      where: {
        id,
        user,
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

  async changeTaskStatus(id: string, body: ChangeTaskStatusDto): Promise<void> {
    const task = await this.tasksRepository.findOne({
      where: {
        id,
      },
    });

    task.status = body.status;

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

import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './dtos/create-task.dto';

@Injectable()
export class TasksService {
  private tasks: Task[];

  constructor() {
    this.tasks = [];
  }

  async getAllTasks(): Promise<Task[]> {
    return this.tasks;
  }

  async getTaskById(id: string): Promise<Task> {
    const task = this.tasks.find((task) => task.id === id);

    return task;
  }

  async createTask(taskBody: CreateTaskDto): Promise<void> {
    const task: Task = {
      id: uuid(),
      title: taskBody.title,
      description: taskBody.description,
      status: TaskStatus.OPEN,
    };

    this.tasks.push(task);
  }
}

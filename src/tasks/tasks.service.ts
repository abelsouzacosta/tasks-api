import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v4 as uuid } from 'uuid';

export interface ITaskDTO {
  title: string;
  description: string;
}

@Injectable()
export class TasksService {
  private tasks: Task[];

  constructor() {
    this.tasks = [];
  }

  async getAllTasks(): Promise<Task[]> {
    return this.tasks;
  }

  async createTask({ title, description }: ITaskDTO): Promise<void> {
    const task: Task = {
      id: uuid(),
      title,
      description,
      status: TaskStatus.OPEN,
    };

    this.tasks.push(task);
  }
}

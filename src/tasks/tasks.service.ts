import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './dtos/create-task.dto';
import { UdpateTaskDto } from './dtos/update-task.dto';
import { GetTasksFilterDto } from './dtos/get-task-filter.dto';

@Injectable()
export class TasksService {
  private tasks: Task[];

  constructor() {
    this.tasks = [];
  }

  async getTasks(): Promise<Task[]> {
    return this.tasks;
  }

  async getTasksWithFilters(filterDto: GetTasksFilterDto): Promise<Task[]> {
    const { search, status } = filterDto;
    let tasks = await this.getTasks();

    if (status) {
      tasks = tasks.filter((task) => task.status === status);
    }

    if (search) {
      tasks = tasks.filter((task) => {
        if (task.title.includes(search) || task.description.includes(search)) {
          return true;
        }

        return false;
      });
    }

    return tasks;
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

  async updateTask(id: string, body: UdpateTaskDto): Promise<void> {
    const task = this.tasks.find((task) => task.id === id);

    task.title = body.title || task.title;
    task.description = body.description || task.description;
  }

  async deleteTask(id: string): Promise<void> {
    const task = this.tasks.find((task) => task.id === id);

    const indexOfTask = this.tasks.indexOf(task);

    this.tasks.splice(indexOfTask, 1);
  }
}

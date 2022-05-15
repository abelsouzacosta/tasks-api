import { Body, Controller, Get, Post } from '@nestjs/common';
import { Task } from './task.model';
import { ITaskDTO, TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  async list(): Promise<Task[]> {
    return this.tasksService.getAllTasks();
  }

  @Post()
  async create(@Body() body: ITaskDTO): Promise<void> {
    return this.tasksService.createTask(body);
  }
}

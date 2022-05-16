import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateTaskDto } from './dtos/create-task.dto';
import { Task } from './task.model';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  async list(): Promise<Task[]> {
    return this.tasksService.getAllTasks();
  }

  @Post()
  async create(@Body() body: CreateTaskDto): Promise<void> {
    return this.tasksService.createTask(body);
  }
}

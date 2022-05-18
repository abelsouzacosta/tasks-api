import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateTaskDto } from './dtos/create-task.dto';
import { GetTasksFilterDto } from './dtos/get-task-filter.dto';
import { UdpateTaskDto } from './dtos/update-task.dto';
import { Task } from './task.model';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  async list(@Query() filterDto: GetTasksFilterDto): Promise<Task[]> {
    if (Object.keys(filterDto).length) {
      return this.tasksService.getTasksWithFilters(filterDto);
    } else {
      return this.tasksService.getTasks();
    }
  }

  @Get('/:id')
  async getTaskById(@Param('id') id: string): Promise<Task> {
    return this.tasksService.getTaskById(id);
  }

  @Post()
  async create(@Body() body: CreateTaskDto): Promise<void> {
    return this.tasksService.createTask(body);
  }

  @Patch('/:id')
  async update(
    @Param('id') id: string,
    @Body() body: UdpateTaskDto,
  ): Promise<void> {
    return this.tasksService.updateTask(id, body);
  }

  @Delete('/:id')
  async delete(@Param('id') id: string): Promise<void> {
    return this.tasksService.deleteTask(id);
  }
}

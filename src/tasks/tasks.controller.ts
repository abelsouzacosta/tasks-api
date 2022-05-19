import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateTaskDto } from './dtos/create-task.dto';
import { UdpateTaskDto } from './dtos/update-task.dto';
import { Task } from './task.entity';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  async create(@Body() data: CreateTaskDto): Promise<void> {
    return this.tasksService.create(data);
  }

  @Get()
  async list(): Promise<Task[]> {
    return this.tasksService.list();
  }

  @Get('/:id')
  async get(@Param('id') id: string): Promise<Task> {
    return this.tasksService.getTask(id);
  }

  @Put('/:id')
  async update(
    @Param('id') id: string,
    @Body() body: UdpateTaskDto,
  ): Promise<void> {
    console.log(body);

    return this.tasksService.update(id, body);
  }

  @Delete('/:id')
  async delete(@Param('id') id: string): Promise<void> {
    return this.tasksService.delete(id);
  }
}

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
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

  @Put('/:id')
  async update(
    @Param('id') id: string,
    @Body() body: UdpateTaskDto,
  ): Promise<void> {
    console.log(body);

    return this.tasksService.update(id, body);
  }
}

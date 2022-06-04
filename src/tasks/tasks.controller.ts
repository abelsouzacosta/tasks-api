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
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { ChangeTaskStatusDto } from './dtos/change-task-status.dto';
import { CreateTaskDto } from './dtos/create-task.dto';
import { GetTasksFilterDto } from './dtos/get-task-filter.dto';
import { UdpateTaskDto } from './dtos/update-task.dto';
import { NotFoundTaskPipe } from './pipes/not-found-task.pipe';
import { Task } from './task.entity';
import { TasksService } from './tasks.service';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  async create(
    @Body() data: CreateTaskDto,
    @GetUser() user: User,
  ): Promise<void> {
    return this.tasksService.create(data, user);
  }

  @Get()
  async list(
    @GetUser() user: User,
    @Query() filterDto?: GetTasksFilterDto,
  ): Promise<Task[]> {
    return this.tasksService.list(user, filterDto);
  }

  @Get('/:id')
  async get(@Param('id', NotFoundTaskPipe) id: string): Promise<Task> {
    return this.tasksService.getTask(id);
  }

  @Put('/:id')
  @UsePipes(new ValidationPipe())
  async update(
    @Param('id', NotFoundTaskPipe) id: string,
    @Body() body: UdpateTaskDto,
  ): Promise<void> {
    return this.tasksService.update(id, body);
  }

  @Patch('/:id')
  @UsePipes(new ValidationPipe())
  async changeTaskStatus(
    @Param('id', NotFoundTaskPipe) id: string,
    @Body() body: ChangeTaskStatusDto,
  ): Promise<void> {
    return this.tasksService.changeTaskStatus(id, body);
  }

  @Delete('/:id')
  async delete(@Param('id', NotFoundTaskPipe) id: string): Promise<void> {
    return this.tasksService.delete(id);
  }
}

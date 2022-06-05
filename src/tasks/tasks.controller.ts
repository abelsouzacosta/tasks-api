import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
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
  private logger: Logger;
  constructor(private tasksService: TasksService) {
    this.logger = new Logger();
  }

  @Post()
  @UsePipes(new ValidationPipe())
  async create(
    @Body() data: CreateTaskDto,
    @GetUser() user: User,
  ): Promise<void> {
    this.logger.verbose(
      `User: ${user.username} - ${
        user.id
      }, is creating a new task ${JSON.stringify(data)}`,
    );
    return this.tasksService.create(data, user);
  }

  @Get()
  async list(
    @GetUser() user: User,
    @Query() filterDto?: GetTasksFilterDto,
  ): Promise<Task[]> {
    this.logger.verbose(`Retrieving task(s) applying filters ${filterDto}`);
    return this.tasksService.list(user, filterDto);
  }

  @Get('/:id')
  async get(
    @Param('id', NotFoundTaskPipe) id: string,
    @GetUser() user: User,
  ): Promise<Task> {
    this.logger.verbose(
      `User: ${user.username} - ${user.id} getting task with id ${id}`,
    );
    return this.tasksService.getTask(id, user);
  }

  @Put('/:id')
  @UsePipes(new ValidationPipe())
  async update(
    @Param('id', NotFoundTaskPipe) id: string,
    @Body() body: UdpateTaskDto,
    @GetUser() user: User,
  ): Promise<void> {
    return this.tasksService.update(id, body, user);
  }

  @Patch('/:id')
  @UsePipes(new ValidationPipe())
  async changeTaskStatus(
    @Param('id', NotFoundTaskPipe) id: string,
    @Body() body: ChangeTaskStatusDto,
    @GetUser() user: User,
  ): Promise<void> {
    this.logger.verbose(
      `User: ${user.username} - ${user.id} change task with id ${id} status to ${body.status}`,
    );
    return this.tasksService.changeTaskStatus(id, body, user);
  }

  @Delete('/:id')
  async delete(
    @Param('id', NotFoundTaskPipe) id: string,
    @GetUser() user: User,
  ): Promise<void> {
    this.logger.verbose(
      `User: ${user.username} - ${user.id} is deleting task with id ${id}`,
    );
    return this.tasksService.delete(id, user);
  }
}

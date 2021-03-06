import { User } from 'src/auth/user.entity';
import { EntityRepository, Repository } from 'typeorm';
import { GetTasksFilterDto } from './dtos/get-task-filter.dto';
import { Task } from './task.entity';

@EntityRepository(Task)
export class TasksRepository extends Repository<Task> {
  async getTasks(user: User, filterDto?: GetTasksFilterDto): Promise<Task[]> {
    const { search, status } = filterDto;

    const query = this.createQueryBuilder('task');

    if (status) {
      query.andWhere(`task.status = :status`, { status });
    }

    if (search) {
      query.andWhere(
        `task.title LIKE :search OR task.description LIKE :search`,
        { search: `%${search}%` },
      );
    }

    query.where({ user });

    const tasks = await query.getMany();
    return tasks;
  }
}

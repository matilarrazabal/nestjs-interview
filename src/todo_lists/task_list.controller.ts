import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Patch,
} from '@nestjs/common';
import { Task} from '../interfaces/todo_list.interface';
import { TodoListsService } from './todo_lists.service';
import { CreateTaskDto } from './dtos/create-task';
import { UpdateTaskDto } from './dtos/update-task';

@Controller('api/tasks')
export class TaskController {
  constructor(private todoListsService: TodoListsService) {}

  @Get('/:todoListId')
  index(@Param() params: { todoListId: number}): Task[] {
    return this.todoListsService.getTasks(params.todoListId);
  }

  @Get('/:todoListId/:taskId')
  show(@Param() params: { todoListId: number, taskId: number}): Task {
    return this.todoListsService.getTask(params.todoListId, params.taskId);
  }

  @Post('/:todoListId')
  create(
    @Param() param: { todoListId: number},
    @Body() dto: CreateTaskDto): Task {
    return this.todoListsService.createTask(param.todoListId, dto);
  }

  @Patch('/:todoListId/:taskId')
  update(
    @Param() params: { todoListId: number, taskId: number },
    @Body() dto: UpdateTaskDto,
  ): Task {
    return this.todoListsService.updateTask(params.todoListId, params.taskId, dto);
  }

  @Delete('/:todoListId/:taskId')
  delete(@Param() params: { todoListId: number, taskId: number }): void {
    this.todoListsService.deleteTask(params.todoListId, params.taskId);
  }
}

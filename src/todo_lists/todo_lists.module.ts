import { Module } from '@nestjs/common';
import { TodoListsController } from './todo_lists.controller';
import { TodoListsService } from './todo_lists.service';
import { TaskController } from './task_list.controller';

@Module({
  imports: [],
  controllers: [TodoListsController, TaskController],
  providers: [
    { provide: TodoListsService, useValue: new TodoListsService([]) },
  ],
})
export class TodoListsModule {}

import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateTodoListDto } from './dtos/create-todo_list';
import { UpdateTodoListDto } from './dtos/update-todo_list';
import { Task, TodoList } from '../interfaces/todo_list.interface';
import { CreateTaskDto } from './dtos/create-task';
import { UpdateTaskDto } from './dtos/update-task';
import { CreateTask, UpdateTask } from './task';

@Injectable()
export class TodoListsService {
  private readonly todolists: TodoList[];

  constructor(todoLists: TodoList[] = []) {
    this.todolists = todoLists;
  }

  all(): TodoList[] {
    return this.todolists;
  }

  get(id: number): TodoList {
    return this.todolists.find((x) => x.id === Number(id));
  }

  create(dto: CreateTodoListDto): TodoList {
    const tasks: Task[] = []
    const todoList: TodoList = {
      id: this.nextId(),
      name: dto.name,
      tasks: tasks,
    };

    this.todolists.push(todoList);

    return todoList;
  }

  update(id: number, dto: UpdateTodoListDto): TodoList {
    const todolistId = this.todolists.findIndex((x) => x.id == Number(id));

    // Update the record
    this.todolists[todolistId].name = dto.name;
    return this.todolists[todolistId];
  }

  delete(id: number): void {
    const index = this.todolists.findIndex((x) => x.id == Number(id));

    if (index > -1) {
      this.todolists.splice(index, 1);
    }
  }

  getTasks(listId: number): Task[] {
    return this.todolists.find((x) => x.id === Number(listId)).tasks;
  }

  getTask(listId: number, taskId: number): Task {
    const list = this.todolists.find((x) => x.id === Number(listId));
    if (list == undefined) {
      throw new BadRequestException('Todo list not found');
    }
    const task = list.tasks.find((x) => x.id === Number(taskId));
    if (task == undefined) {
      throw new BadRequestException('Task not found'); 
    } 
    return task;
  }

  deleteTask(todoListId: number, taskId: number) {
    const indxList = this.todolists.findIndex((x) => x.id === Number(todoListId));
    if (indxList < 0) {
      throw new BadRequestException('Todo list not found');
    }
    const index = this.todolists[indxList].tasks.findIndex((x) => x.id === Number(taskId));
    if (index < 0) {
      throw new BadRequestException('Task not found'); 
    } 
    this.todolists[indxList].tasks.splice(index, 1);
  }
  
  updateTask(todoListId: number, taskId: number, dto: UpdateTaskDto): Task {
    const listIdx = this.todolists.findIndex((x) => x.id === Number(todoListId));
    if (listIdx < 0) {
      throw new BadRequestException('Todo list not found');
    }
    const index = this.todolists[listIdx].tasks.findIndex((x) => x.id === Number(taskId));
    if (index < 0) {
      throw new BadRequestException('Task not found'); 
    } 
    const taskUpdated: Task = UpdateTask(this.todolists[listIdx].tasks[index], dto)
    this.todolists[listIdx].tasks[index] = taskUpdated;
    return taskUpdated;
  }
 
  createTask(todoListId: number, dto: CreateTaskDto): Task {
    const task: Task = CreateTask(this.nextTaskId(todoListId), dto.name,dto.description);
    const indxList = this.todolists.findIndex((x) => x.id === Number(todoListId));
    if (indxList < 0) {
      throw new BadRequestException('Todo list not found');
    }
    this.todolists[indxList].tasks.push(task)
    return task
  }
 
  /* Make it generic */
  private nextTaskId(todoListId): number {
    const last = this.todolists.find((x) => x.id === Number(todoListId))
      .tasks
      .map((x) => x.id)
      .sort()
      .reverse()[0];

    return last ? last + 1 : 1;
  }

  private nextId(): number {
    const last = this.todolists
      .map((x) => x.id)
      .sort()
      .reverse()[0];

    return last ? last + 1 : 1;
  }
}

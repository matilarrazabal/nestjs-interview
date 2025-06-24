import { Test, TestingModule } from '@nestjs/testing';
import { before } from 'node:test';
import { TodoListsController } from './todo_lists.controller';
import { TodoListsService } from './todo_lists.service';
import { CreateTask } from './task';
import { TaskController } from './task_list.controller';
import { Status } from './dtos/task-status';

describe('TodoListsController', () => {
  let todoListService: TodoListsService;
  let taskController: TaskController;
  let todoListsController: TodoListsController;

  beforeEach(async () => {
    todoListService = new TodoListsService([
      { id: 1, name: 'test1', tasks: [] },
      { id: 2, name: 'test2', tasks: [] },
    ]);

    const app: TestingModule = await Test.createTestingModule({
      controllers: [TaskController, TodoListsController],
      providers: [{ provide: TodoListsService, useValue: todoListService }],
    }).compile();

    taskController = app.get<TaskController>(TaskController);
    todoListsController = app.get<TodoListsController>(TodoListsController);
  });

  describe('Add task to a list', () => {
    it('List before adding a task', () => {
      expect(todoListsController.index()).toEqual([
        { id: 1, name: 'test1', tasks: []  },
        { id: 2, name: 'test2', tasks: []  },
      ]);
    });
    it('add task t1 to a list 1', () => {
      expect(taskController.create({ todoListId: 1 }, {"name":"t1 en 1", "description":"desc t1"})).toEqual(
        {"id":1, "name":"t1 en 1", "description":"desc t1", "status":"Pending"}
      );
      expect(todoListsController.index()).toEqual([
        { id: 1, name: 'test1', tasks: [{"id":1, "name":"t1 en 1", "description":"desc t1", "status":"Pending"}]  },
        { id: 2, name: 'test2', tasks: []  },
      ]);
    });
  });

  describe('Update task status in a list', () => {
    it('start the task t1 to a list 1', () => {
      expect(taskController.create({ todoListId: 1 }, {"name":"t1 en 1", "description":"desc t1"})).toEqual(
        {"id":1, "name":"t1 en 1", "description":"desc t1", "status":"Pending"}
      );
      taskController.update({"todoListId":1, "taskId":1},{"status": Status.InProgress})
      expect(todoListsController.index()).toEqual([
        { id: 1, name: 'test1', tasks: [{"id":1, "name":"t1 en 1", "description":"desc t1", "status":"InProgress"}]  },
        { id: 2, name: 'test2', tasks: []  },
      ]);
    });
  });

  describe('Update task status in a list', () => {
    it('start the task t1 to a list 1', () => {
      expect(taskController.create({ todoListId: 1 }, {"name":"t1 en 1", "description":"desc t1"})).toEqual(
        {"id":1, "name":"t1 en 1", "description":"desc t1", "status":"Pending"}
      );
      expect(taskController.create({ todoListId: 1 }, {"name":"t2 en 2", "description":"desc t2"})).toEqual(
        {"id":2, "name":"t2 en 2", "description":"desc t2", "status":"Pending"}
      );
      taskController.delete({"todoListId":1, "taskId":1})
      expect(todoListsController.index()).toEqual([
        { id: 1, name: 'test1', tasks: [{"id":2, "name":"t2 en 2", "description":"desc t2", "status":"Pending"}]  },
        { id: 2, name: 'test2', tasks: []  },
      ]);
    });
  });
});

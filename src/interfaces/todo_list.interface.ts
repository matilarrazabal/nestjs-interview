import { Status } from "src/todo_lists/dtos/task-status";

export interface Task {
  id: number;
  name: string;
  description: string;
  status: Status;
}


export interface TodoList {
  id: number;
  name: string;
  tasks: Task[];
}
export interface Task {
  id: number;
  name: string;
  descripcion: string;
  status: Status;
}


export interface TodoList {
  id: number;
  name: string;
  tasks: Task[];
}

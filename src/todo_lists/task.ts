import { Task } from "src/interfaces/todo_list.interface";
import { UpdateTaskDto } from "./dtos/update-task";
import { Status } from "./dtos/task-status";

export function CreateTask(id: number, name: string, description: string): Task {
    const task: Task = {
        id: id,
        name: name,
        description: description,
        status: Status.Pending,
    };
    return task;
}

export function UpdateTask(task: Task, dto: UpdateTaskDto): Task {
    const newtask: Task = {
        id: task.id,
        name: dto.name? dto.name: task.name,
        description: dto.description? dto.description: task.description,
        status: dto.status? dto.status: task.status
    };
    return newtask;
}


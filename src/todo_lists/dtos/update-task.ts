import { Status } from "./task-status";

export class UpdateTaskDto {
    name?: string;
    description?: string;
    status?: Status;
}
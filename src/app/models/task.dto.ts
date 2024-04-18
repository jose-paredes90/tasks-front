export class TaskDto {
    id!: string;
    title!: string;
    description!: string;
    dueDate!: Date;
    priority!: string;
    tags!: string[];
    state!: number;
}
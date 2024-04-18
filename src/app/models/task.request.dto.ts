export class TaskRequestDto {
    title!: string;
    description!: string;
    dueDate!: Date;
    priority!: string;
    tags!: string[];
    state!: number;
}